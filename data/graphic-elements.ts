export const graphicElements:Record<string,string> = {
  "custom-football-mascot-bow":"Mascot identity, one statement bow, simplified football seam/detail, tiny stars or motion marks only if needed",
  "retro-teacher-icons":"Pencil, composition notebook, apple, ruler, smiley/flower accent, one oversized hero school object",
  "varsity-game-day":"Pennant, athletic number, stadium star, football seam, cropped stripe or ticket-stub detail",
  "holiday-hostess":"Cocktail coupe, citrus twist, olive, ribbon flourish, tiny botanical sprig, petite starburst",
  "weekend-lake-club":"Lake horizon, dock line, simplified boat or buoy, sun disc, small wave marks",
  "nurse-bow-badge":"Statement bow, subtle badge shape, tiny medical cross or clean occupation symbol, optional personalized name detail",
  "custom-school-script":"School or mascot name, tiny star/bolt/pennant accents, minimal underline or stitched shadow detail",
  "coastal-tennis-club":"Tennis racket, ball, small crest, shell or wave accent, restrained club-house detail",
  "spooky-book-club":"Open or stacked book, crescent moon, tiny stars, candle or moth accent, restrained spooky botanical",
  "cheer-mascot-stack":"Mascot name stack, mini megaphone, pom or star accent, pennant, small motion marks",
  "teacher-mascot-bow":"Mascot identity, statement bow, one school cue such as apple/notebook/pencil, tiny star accents",
  "custom-pet-prep":"Digitally hand-drawn pet portrait, monogram/crest frame, tiny floral sprigs, optional ribbon or collar detail",
  "holiday-cookie-social":"One oversized iced cookie, piping/icing marks, rolling pin or recipe-card accent, tiny sprinkle/star details",
  "gameday-mom-club":"Small football seam, pennant, sideline star, varsity number, restrained club-mark accents",
  "bookstore-weekend":"Book stack or open book, storefront awning, coffee cup, bookmark/check detail, tiny editorial stars",
  "dental-bow-club":"Statement bow, simplified tooth outline or dental sparkle, clean badge frame, tiny dot/star accents",
  "winter-ski-social":"Mountain silhouette, skis or poles, lodge/chalet detail, tiny sun/snow marks, retro resort badge",
  "custom-jersey-bow":"Jersey number, personalized name, seam/stitch marks, small mascot or sport icon, supporting bow detail"
};

export function getGraphicElements(id:string){return graphicElements[id] || "Concept-specific hand-drawn motifs selected to support the hierarchy without clutter.";}
