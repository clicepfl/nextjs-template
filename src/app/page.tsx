import styles from "@/styles/Home.module.scss";
import { directus } from "@/directus";
import { readSingleton } from "@directus/sdk";
import { getTranslation, queryTranslations } from "@/locales";
import DirectusImage from "@/components/DirectusImage";

export default async function Home() {
  const association = await directus().request(
    readSingleton("association", {
      // @ts-expect-error
      fields: ["*", "translations.*", "translations.banner.*"],
    }),
  );
  const translations = getTranslation(association, "en");

  return (
    <main className={styles.main}>
      <p></p>
      <div className={styles.center}>
        <DirectusImage img={translations.banner} sizes="50rem" cover />
      </div>

      <pre className={styles.markdown}>{translations.description}</pre>
    </main>
  );
}
