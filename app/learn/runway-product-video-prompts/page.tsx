import type { Metadata } from "next";
import Link from "next/link";
import { LearnArticleLayout } from "@/components/LearnArticleLayout";

export const metadata: Metadata = {
  title: "Runway Product Video Prompts: How to Turn Product Images Into Short Ads",
  description:
    "Learn how to structure Runway prompts that turn product images and reference-based visuals into short ad concepts."
};

export default function DuplicateGuard() {
  return (
    <LearnArticleLayout
      title="Runway Product Video Prompts: How to Turn Product Images Into Short Ads"
      intro="A lot of marketers assume that once they have a good product image, video is a separate problem. In reality, the best short-form product videos usually inherit their logic from a strong static frame. Composition, product hierarchy, lighting behavior, and prop restraint are already solved in the still. The Runway prompt then decides how that frame should move."
    >
      <p>
        That is why reference-based prompting matters so much for short-form product ads. If your source image is messy, the motion prompt has very little to build on. If your source image is clean and clearly commercial, a short video prompt can focus on reveal, rhythm, and CTA instead of trying to rescue a weak composition.
      </p>
      <h2>Start with a still that already feels like an ad</h2>
      <p>
        Before writing any Runway prompt, ask whether your base image already behaves like a usable ad frame. Is the product centered or otherwise clearly dominant? Is there enough negative space for copy? Does the label read? Are the props controlled? If the answer is no, the motion prompt will inherit those weaknesses. This is why it is often smart to begin with a structured Image Prompt from <Link href="/templates">the template library</Link>.
      </p>
      <p>
        When the still is strong, the motion prompt can stay simple. You do not need ten camera moves and six special effects. In most ecommerce and social ad cases, one reveal move, one texture moment, and one clean final lockup are enough.
      </p>
      <h2>Think in three beats: establish, reveal, lock</h2>
      <p>
        The easiest way to structure a short product video prompt is with three beats. First you establish the environment and mood. Second you reveal the product or its key benefit. Third you lock into a stable hero frame that can support branding, offer copy, or a CTA. This structure works across beauty, food, fashion, and general ecommerce because it mirrors how short ads persuade. They orient, they clarify, then they convert.
      </p>
      <pre>
        <code>{`A premium serum bottle sits on a translucent pedestal in pearl-white beauty light. Soft reflections move across the glass as the camera slowly pushes in. The final frame locks on a clean centered product hero with room for headline and CTA.`}</code>
      </pre>
      <p>
        That prompt is not flashy, but it is useful. It tells the model what the environment is, what kind of motion happens, and what the end frame must accomplish.
      </p>
      <h2>Use motion to reinforce the product benefit</h2>
      <p>
        The best Runway prompts do not add motion randomly. They pick motion that supports the product story. For skincare, that may be controlled reflections, dewy highlights, or a soft reveal. For food, it could be steam, pour action, texture movement, or garnish. For fashion, it might be fabric flow, silhouette turns, or light movement across material detail. For SaaS or apps, it may be UI transitions or subtle interface emphasis.
      </p>
      <p>
        Motion should answer the question: what single movement makes the product more understandable or more desirable? Once you answer that, the prompt gets better immediately.
      </p>
      <h2>Prompt example: product image to short ad</h2>
      <p>
        Suppose you have a clear ecommerce hero image of a coffee bag beside a ceramic cup. A weak video prompt might say:
      </p>
      <pre>
        <code>{`make this a cinematic coffee commercial`}</code>
      </pre>
      <p>
        That is too open. A stronger version looks like this:
      </p>
      <pre>
        <code>{`Warm morning light enters from the side while soft steam rises from a ceramic cup beside a premium coffee bag. Use a slow push-in toward the packaging, keep the wood texture calm, and finish on a centered artisanal coffee hero with clear brand and offer space.`}</code>
      </pre>
      <p>
        The second prompt knows what kind of light, what kind of motion, what stays calm, and what the ending must do. That is what makes it commercially useful.
      </p>
      <h2>Keep the final frame usable</h2>
      <p>
        Many short AI videos fail because the ending is visually unstable. The product is still moving, the composition is unclear, or the background is too busy to layer text. In actual ad production, the final frame matters a lot. It is often where the headline, offer, CTA, or brand mark appears. When you write a Runway prompt, explicitly tell the model to end on a stable hero frame.
      </p>
      <p>
        Phrases that help:
      </p>
      <ul>
        <li>End on a clean centered hero frame</li>
        <li>Hold a stable product-first composition</li>
        <li>Leave room for headline and CTA</li>
        <li>Keep the label readable in the final lockup</li>
      </ul>
      <h2>Different categories need different motion logic</h2>
      <p>
        Beauty often benefits from slow elegant motion, controlled reflections, and premium reveal pacing. Food usually needs appetite cues such as steam, pour motion, garnish action, or texture detail. Fashion benefits from silhouette, fabric movement, or accessory highlights. General ecommerce often performs better with simpler landing-page-style movement and a very strong final lockup.
      </p>
      <p>
        Here are short examples:
      </p>
      <pre>
        <code>{`Beauty: Soft pearl light moves across the bottle while the camera slowly pushes in and ends on a polished centered hero.`}</code>
      </pre>
      <pre>
        <code>{`Food: Steam rises from the cup, the camera glides toward the packaging, and the final frame holds a warm appetizing hero.`}</code>
      </pre>
      <pre>
        <code>{`Fashion: Light catches the leather grain as the camera glides across the handbag, then settles into a clean editorial hero frame.`}</code>
      </pre>
      <h2>Use the storyboard as a bridge between still and video</h2>
      <p>
        One of the easiest ways to improve a Runway prompt is to write a three-scene storyboard first. The storyboard forces you to decide what happens first, second, and third. That prevents the prompt from becoming a vague description of motion. It also makes it easier to match the video back to the campaign idea. This is why strong template systems often pair the Image Prompt with a storyboard and a Runway prompt rather than treating them as unrelated assets.
      </p>
      <p>
        If you want to practice, compare a few templates across categories inside <Link href="/templates">the template library</Link>. You will notice that the best ones describe the motion as an extension of the still, not as an entirely new scene. Then take the structure into the <Link href="/generator">generator</Link> and adapt it to your own product type or campaign objective.
      </p>
      <p>
        The core principle is simple: start from a still that already works, add only the motion that reinforces the product story, and end on a frame you could genuinely use in a campaign. That is how short AI videos start becoming commercial assets instead of experiments.
      </p>
    </LearnArticleLayout>
  );
}
