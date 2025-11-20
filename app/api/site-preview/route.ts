import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

type SitePreviewInputs = {
  brand_name: string;
  business_description: string;
  primary_offer: string;
  target_audience: string;
  industry: string;
  site_goal: string;
  vibe: string;
  hero_style: string;
  logo_description?: string;
};

type SitePreviewResult = {
  hero: {
    title: string;
    subtitle: string;
    cta_main: string;
    cta_secondary: string;
    visual_style: string;
  };
  palette: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    background_color: string;
    text_color: string;
  };
  meta: {
    brand_name: string;
    target_audience: string;
    site_goal: string;
    vibe: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY env var" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => null);
    const inputs: SitePreviewInputs | null = body?.inputs ?? null;

    if (!inputs) {
      return new Response(
        JSON.stringify({ error: "Missing `inputs` in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userDescription = `
Marque: ${inputs.brand_name}
Activité: ${inputs.business_description}
Offre principale: ${inputs.primary_offer}
Audience cible: ${inputs.target_audience}
Secteur: ${inputs.industry}
Objectif du site: ${inputs.site_goal}
Ambiance (vibe): ${inputs.vibe}
Style de hero souhaité: ${inputs.hero_style}
Logo: ${inputs.logo_description ?? "non fourni"}
`.trim();

    const systemPrompt = `
Tu es un assistant expert en conception de pages d'accueil pour sites web.
Ta mission est de générer un bloc "Hero" et une palette de couleurs pour un site vitrine.

Tu dois OBLIGATOIREMENT répondre sous la forme d'un objet JSON strict dont la structure est:

{
  "hero": {
    "title": "string",
    "subtitle": "string",
    "cta_main": "string",
    "cta_secondary": "string",
    "visual_style": "string"
  },
  "palette": {
    "primary_color": "string (hex)",
    "secondary_color": "string (hex)",
    "accent_color": "string (hex)",
    "background_color": "string (hex)",
    "text_color": "string (hex)"
  },
  "meta": {
    "brand_name": "string",
    "target_audience": "string",
    "site_goal": "string",
    "vibe": "string"
  }
}

Contraintes:
- Le titre doit être court, clair, orienté bénéfice pour l'audience cible.
- Le sous-titre peut faire 1 à 2 phrases maximum.
- cta_main = appel à l'action principal (ex: 'Découvrir l'offre', 'Commencer maintenant').
- cta_secondary = appel à l'action secondaire (ex: 'Voir un autre exemple', 'En savoir plus').
- Les couleurs doivent avoir un bon contraste pour être lisibles sur écran.
- Respecter l'ambiance (vibe) demandée.
- Pas de texte en anglais si l'entrée est en français.
- Ne JAMAIS ajouter de commentaires en dehors du JSON.
`.trim();

    const userPrompt = `
Voici les informations sur le projet. Génère un hero et une palette adaptés.

${userDescription}
`.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Empty response from OpenAI" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    let parsed: SitePreviewResult;
    if (typeof content === "string") {
      parsed = JSON.parse(content) as SitePreviewResult;
    } else {
      // @ts-ignore - in some runtimes content may already be an object
      parsed = content as SitePreviewResult;
    }

    return new Response(
      JSON.stringify({
        status: "ok",
        hero: parsed.hero,
        palette: parsed.palette,
        meta: parsed.meta
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("site-preview OpenAI error:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Unexpected error in site-preview endpoint",
        detail: error?.message ?? null
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
