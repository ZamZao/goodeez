export default function MentionsLegalesPage() {
  // Informations légales à remplir ici
  const companyName = "Nom de la société";
  const companyLegalType = "Forme juridique (ex : SAS)";
  const companyCapital = "Montant du capital";
  const companyRcsCity = "Ville du RCS";
  const companySiren = "Numéro SIREN";
  const companyAddress = "Adresse complète";
  const companyVat = "Numéro de TVA intracommunautaire";
  const directorName = "Nom du directeur de la publication";
  const contactEmail = "contact@goodeez.fr";

  return (
    <div className="prose prose-slate max-w-none">
      <h1>Mentions légales</h1>

      {/* Éditeur du site */}
      <section className="mb-10">
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>Goodeez</strong> est édité par la société{" "}
          <strong>{companyName}</strong>, {companyLegalType} au capital de{" "}
          {companyCapital} euros, immatriculée au Registre du Commerce et des
          Sociétés de {companyRcsCity} sous le numéro {companySiren}.
        </p>
        <p>
          <strong>Siège social :</strong> {companyAddress}
          <br />
          <strong>Numéro de TVA intracommunautaire :</strong> {companyVat}
          <br />
          <strong>Directeur de la publication :</strong> {directorName}
          <br />
          <strong>Contact :</strong>{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </section>

      {/* Hébergement */}
      <section className="mb-10">
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par :
          <br />
          <strong>Vercel Inc.</strong>
          <br />
          440 N Barranca Ave #4133
          <br />
          Covina, CA 91723
          <br />
          États-Unis
          <br />
          Site :{" "}
          <a href="https://vercel.com" target="_blank" rel="noreferrer">
            https://vercel.com
          </a>
        </p>
      </section>

      {/* Propriété intellectuelle */}
      <section className="mb-10">
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des éléments composant le site Goodeez, et notamment
          les textes, graphismes, illustrations, logos, icônes, images,
          maquettes d&apos;interface, photographies, vidéos, ainsi que
          l&apos;architecture générale du site et son code source, sont la
          propriété exclusive de {companyName}, sauf mention contraire
          explicite.
        </p>
        <p>
          Toute reproduction, représentation, modification, adaptation,
          téléchargement, distribution, transmission ou exploitation, totale ou
          partielle, du site ou de l&apos;un quelconque de ses éléments, par
          quelque procédé que ce soit, est interdite sans l&apos;autorisation
          écrite préalable de {companyName} et constitue une contrefaçon
          susceptible d&apos;engager la responsabilité de son auteur au sens des
          articles L.335-2 et suivants du Code de la propriété intellectuelle.
        </p>
        <p>
          Les noms de produits, dénominations commerciales, marques et logos
          pouvant apparaître sur le site et appartenant à des sociétés
          partenaires ou clientes restent leur propriété respective.
        </p>
      </section>

      {/* Utilisation du site & responsabilité */}
      <section className="mb-10">
        <h2>Utilisation du site et responsabilité</h2>
        <p>
          L&apos;utilisateur s&apos;engage à utiliser le site Goodeez dans le
          respect des lois et réglementations en vigueur et à ne pas porter
          atteinte aux droits de {companyName} ou de tiers.
        </p>
        <p>
          {companyName} s&apos;efforce d&apos;assurer l&apos;exactitude et la
          mise à jour des informations diffusées sur le site. Toutefois, ces
          informations sont fournies à titre indicatif et ne sauraient être
          garanties comme exhaustives, exactes ou à jour en permanence.
        </p>
        <p>
          En conséquence, {companyName} ne saurait être tenue responsable :
        </p>
        <ul>
          <li>
            de toute imprécision, inexactitude ou omission portant sur des
            informations disponibles sur le site&nbsp;;
          </li>
          <li>
            d&apos;un dommage résultant d&apos;une intrusion frauduleuse d&apos;un
            tiers ayant entraîné une modification des informations mises à
            disposition sur le site&nbsp;;
          </li>
          <li>
            et plus généralement, de tout dommage direct ou indirect, quelles
            qu&apos;en soient les causes, origines, natures ou conséquences,
            provoqué à raison de l&apos;accès de quiconque au site ou de
            l&apos;impossibilité d&apos;y accéder, de l&apos;utilisation du site
            et/ou du crédit accordé à une quelconque information provenant
            directement ou indirectement de ce dernier.
          </li>
        </ul>
        <p>
          {companyName} se réserve le droit de suspendre temporairement
          l&apos;accès au site pour des raisons de maintenance technique,
          d&apos;évolution de ses services ou de sécurité, sans que cette
          interruption n&apos;ouvre droit à une quelconque indemnisation pour
          l&apos;utilisateur.
        </p>
      </section>

      {/* Données personnelles & RGPD */}
      <section className="mb-10">
        <h2>Données personnelles &amp; RGPD</h2>
        <p>
          Dans le cadre de l&apos;utilisation du site Goodeez et des services
          associés (création de portail, gestion de commandes, demandes de
          démonstration, prise de contact, etc.), {companyName} est amenée à
          collecter et traiter des données à caractère personnel concernant les
          utilisateurs.
        </p>
        <p>
          {companyName} agit en qualité de{" "}
          <strong>responsable de traitement</strong> au sens du Règlement (UE)
          2016/679 du 27 avril 2016 (RGPD) et de la loi &quot;Informatique et
          Libertés&quot; modifiée.
        </p>

        <h3>Finalités du traitement</h3>
        <p>Les données collectées sont principalement traitées pour :</p>
        <ul>
          <li>
            la gestion des demandes de contact, de démonstration ou
            d&apos;information&nbsp;;
          </li>
          <li>
            la création et la gestion des portails de merch pour les clients
            professionnels&nbsp;;
          </li>
          <li>
            la gestion des commandes, facturation et suivi logistique&nbsp;;
          </li>
          <li>
            l&apos;envoi éventuel de communications liées au service (emails
            transactionnels, notifications, mises à jour)&nbsp;;
          </li>
          <li>
            la réalisation de statistiques anonymisées de fréquentation et
            d&apos;amélioration du site.
          </li>
        </ul>

        <h3>Base légale</h3>
        <p>
          Les traitements reposent, selon les cas, sur l&apos;exécution d&apos;un
          contrat, le respect d&apos;obligations légales, l&apos;intérêt
          légitime de {companyName} ou le consentement de l&apos;utilisateur
          lorsque celui-ci est requis (par exemple pour certaines opérations de
          prospection ou certains cookies).
        </p>

        <h3>Durée de conservation</h3>
        <p>
          Les données personnelles sont conservées pendant la durée nécessaire à
          la réalisation des finalités pour lesquelles elles ont été collectées,
          augmentée le cas échéant des durées de prescription légale
          applicables.
        </p>

        <h3>Droits des utilisateurs</h3>
        <p>
          Conformément au RGPD et à la loi &quot;Informatique et Libertés&quot;
          modifiée, vous disposez des droits suivants sur vos données :
        </p>
        <ul>
          <li>droit d&apos;accès&nbsp;;</li>
          <li>droit de rectification&nbsp;;</li>
          <li>droit d&apos;effacement (droit à l&apos;oubli)&nbsp;;</li>
          <li>droit d&apos;opposition&nbsp;;</li>
          <li>droit à la limitation du traitement&nbsp;;</li>
          <li>droit à la portabilité des données&nbsp;;</li>
          <li>
            droit d&apos;introduire une réclamation auprès de la CNIL
            (www.cnil.fr).
          </li>
        </ul>
        <p>
          Vous pouvez exercer vos droits en écrivant à{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Une preuve
          d&apos;identité pourra vous être demandée en cas de doute raisonnable
          sur votre identité.
        </p>
        <p>
          Pour plus d&apos;informations sur les traitements de données
          personnelles, veuillez consulter notre{" "}
          <a href="/confidentialite">Politique de confidentialité</a>.
        </p>
      </section>

      {/* Cookies */}
      <section className="mb-10">
        <h2>Cookies</h2>
        <p>
          Le site Goodeez peut déposer sur votre terminal des cookies et autres
          traceurs afin d&apos;assurer le bon fonctionnement du site, de mesurer
          l&apos;audience et, le cas échéant, d&apos;améliorer votre
          expérience de navigation.
        </p>
        <p>
          Certains cookies sont strictement nécessaires au fonctionnement du
          site et ne nécessitent pas votre consentement. D&apos;autres cookies,
          notamment de mesure d&apos;audience ou de personnalisation, peuvent
          nécessiter votre accord préalable.
        </p>
        <p>
          Vous pouvez à tout moment accepter, refuser ou paramétrer vos choix
          en matière de cookies via l&apos;outil dédié ou les réglages de votre
          navigateur.
        </p>
        <p>
          Pour plus de détails, veuillez consulter notre{" "}
          <a href="/cookies">Politique de gestion des cookies</a>.
        </p>
      </section>

      {/* Liens hypertextes */}
      <section className="mb-10">
        <h2>Liens hypertextes</h2>
        <p>
          Le site Goodeez peut proposer des liens vers d&apos;autres sites
          internet. Ces liens sont fournis uniquement pour faciliter la
          navigation de l&apos;utilisateur.
        </p>
        <p>
          {companyName} n&apos;exerce aucun contrôle sur le contenu de ces sites
          tiers et ne saurait être tenue responsable de leur contenu, de leur
          fonctionnement, ni de tout dommage qui pourrait résulter de leur
          consultation.
        </p>
      </section>

      {/* Commandes, CGV et autres documents contractuels */}
      <section className="mb-10">
        <h2>Commandes, conditions générales et documents contractuels</h2>
        <p>
          Les conditions applicables aux commandes de produits, packs et
          services proposés via les portails Goodeez sont définies dans nos{" "}
          <a href="/cgv">Conditions générales de vente (CGV)</a> et, le cas
          échéant, dans les contrats conclus avec nos clients professionnels.
        </p>
        <p>
          L&apos;utilisation des portails et services Goodeez peut également
          être encadrée par des{" "}
          <a href="/cgu">Conditions générales d&apos;utilisation (CGU)</a>.
        </p>
      </section>

      {/* Réclamations / médiation (optionnel à compléter plus tard) */}
      <section className="mb-10">
        <h2>Réclamations</h2>
        <p>
          Pour toute réclamation relative au site ou aux services, vous pouvez
          nous contacter à l&apos;adresse suivante :{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <p>
          Les clients professionnels sont invités à se référer à leurs contrats
          et conditions générales applicables pour les modalités détaillées de
          traitement des litiges.
        </p>
      </section>

      {/* Droit applicable */}
      <section className="mb-10">
        <h2>Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. En
          cas de litige et à défaut d&apos;accord amiable, les tribunaux
          compétents du ressort de {companyRcsCity} seront seuls compétents,
          sous réserve d&apos;une attribution de compétence spécifique découlant
          d&apos;un texte de loi ou réglementaire particulier.
        </p>
      </section>
    </div>
  );
}
