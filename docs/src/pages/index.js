import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import logo from "@site/static/img/agh.webp";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
      wrapperClassName={styles.flex}
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <img src={logo} alt="Logo AGH UST" />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/intro">
              Dokumentacja
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}
