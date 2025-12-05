export default function ConfidentialitePage() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>Politique de Confidentialité</h1>

      <p className="text-sm text-slate-500 mb-8">
        Dernière mise à jour : 05/12/2025
      </p>

      {/* 0. Responsable du traitement */}
      <section className="mb-8">
        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données est <strong>[Nom de la société]</strong>,
          [Forme juridique], dont le siège social est situé à [Adresse complète].  
          Pour toute question relative à vos données personnelles, vous pouvez nous contacter à :
          <a href="mailto:privacy@goodeez.fr"> privacy@goodeez.fr</a>.
        </p>
      </section>

      {/* 1. Collecte des données */}
      <section className="mb-8">
        <h2>1. Collecte des données</h2>
        <p>
          Nous collectons des données personnelles lorsque vous utilisez nos services,
          notamment lors de la création d’un portail, de la passation d’une commande,
          de la configuration d’un compte ou lorsque vous contactez notre support.
        </p>
        <h3>Données fournies directement</h3>
        <ul>
          <li>Nom, prénom, adresse e-mail professionnelle</li>
          <li>Nom de l’entreprise, informations de facturation</li>
          <li>Adresse de livraison des collaborateurs</li>
          <li>Logo, images ou éléments fournis pour créer votre portail</li>
          <li>Contenu de vos messages au support</li>
        </ul>

        <h3>Données collectées automatiquement</h3>
        <ul>
          <li>Adresse IP</li>
          <li>Données de navigation (pages consultées, clics, temps passé)</li>
          <li>Type d’appareil, système d’exploitation et navigateur</li>
          <li>Logs techniques (erreurs, performances)</li>
        </ul>
      </section>

      {/* 2. Utilisation des données */}
      <section className="mb-8">
        <h2>2. Utilisation des données</h2>
        <p>Nous utilisons vos données pour les finalités suivantes :</p>
        <ul>
          <li>Créer et personnaliser votre portail Goodeez</li>
          <li>Gérer vos commandes, factures et livraisons</li>
          <li>Envoyer des e-mails transactionnels et de suivi</li>
          <li>Assurer le support client et traiter vos demandes</li>
          <li>Améliorer notre site, nos fonctionnalités et nos services</li>
          <li>Respecter nos obligations légales, comptables et fiscales</li>
        </ul>

        <h3>Bases légales</h3>
        <ul>
          <li><strong>Exécution du contrat :</strong> création de portail, gestion des commandes</li>
          <li><strong>Obligations légales :</strong> facturation, conservation des documents</li>
          <li><strong>Intérêt légitime :</strong> sécurité, statistiques, prévention des fraudes</li>
          <li><strong>Consentement :</strong> cookies non essentiels, communications facultatives</li>
        </ul>
      </section>

      {/* 3. Partage des données */}
      <section className="mb-8">
        <h2>3. Partage des données</h2>
        <p>
          Nous ne vendons jamais vos données personnelles.  
          Nous les partageons uniquement avec des prestataires essentiels
          au fonctionnement du service, notamment :
        </p>
        <ul>
          <li><strong>Hébergement :</strong> Vercel (site), Supabase (base de données)</li>
          <li><strong>Stockage :</strong> AWS S3 (images, logos)</li>
          <li><strong>Production & logistique :</strong> fournisseurs, imprimeurs, transporteurs</li>
          <li><strong>Paiement :</strong> prestataire de paiement sécurisé (ex : Stripe)</li>
        </ul>
        <p>
          Ces prestataires agissent en tant que sous-traitants et respectent la réglementation
          en vigueur, y compris le RGPD.
        </p>
      </section>

      {/* 4. Durées de conservation */}
      <section className="mb-8">
        <h2>4. Durée de conservation des données</h2>
        <p>Vos données sont conservées uniquement pendant les durées nécessaires :</p>
        <ul>
          <li>Données du compte : tant que le compte est actif</li>
          <li>Commandes et factures : 10 ans (obligations légales)</li>
          <li>Données marketing : 3 ans après le dernier contact</li>
          <li>Cookies : 6 à 13 mois selon leur nature</li>
          <li>Logs serveur : 6 à 12 mois</li>
        </ul>
      </section>

      {/* 5. Vos droits */}
      <section className="mb-8">
        <h2>5. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>Droit d’accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit d’effacement (droit à l’oubli)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d’opposition</li>
          <li>Droit à la portabilité</li>
          <li>Droit de retirer votre consentement à tout moment</li>
          <li>Droit d'introduire une réclamation auprès de la CNIL</li>
        </ul>
        <p>
          Pour exercer vos droits, contactez-nous à :{" "}
          <a href="mailto:privacy@goodeez.fr">privacy@goodeez.fr</a>.
        </p>
      </section>

      {/* 6. Cookies */}
      <section className="mb-8">
        <h2>6. Cookies</h2>
        <p>
          Nous utilisons des cookies pour assurer le bon fonctionnement du site, personnaliser
          votre expérience, mesurer l’audience et améliorer nos services.
        </p>
        <p>
          Vous pouvez configurer votre navigateur pour refuser tout ou partie des cookies.
          Cependant, certaines fonctionnalités (connexion, portail, panier) peuvent ne pas
          fonctionner correctement sans cookies.
        </p>
        <p>
          Pour plus d'informations, consultez notre page dédiée : <a href="/cookies">Politique des cookies</a>.
        </p>
      </section>

      {/* 7. Sécurité */}
      <section className="mb-8">
        <h2>7. Sécurité des données</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles strictes :
        </p>
        <ul>
          <li>Chiffrement des données en transit (HTTPS / TLS)</li>
          <li>Stockage sécurisé via Supabase et AWS</li>
          <li>Accès internes limités et contrôlés</li>
          <li>Sauvegardes régulières</li>
          <li>Surveillance et prévention des accès non autorisés</li>
        </ul>
        <p>
          En cas de violation de données, nous nous engageons à respecter nos obligations de
          notification conformément au RGPD.
        </p>
      </section>

      {/* 8. Transfert hors UE */}
      <section className="mb-8">
        <h2>8. Transferts hors Union Européenne</h2>
        <p>
          Certains de nos prestataires (ex : Vercel, AWS) peuvent transférer des données
          hors de l’Union Européenne.  
          Ces transferts sont encadrés par des clauses contractuelles types et des garanties
          conformes au RGPD.
        </p>
      </section>

      {/* 9. Modifications */}
      <section className="mb-8">
        <h2>9. Modifications de la politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique à tout moment.  
          En cas de changement significatif, nous vous en informerons via e-mail ou sur votre portail.
        </p>
      </section>

      {/* 10. Contact */}
      <section className="mb-8">
        <h2>10. Contact</h2>
        <p>
          Pour toute question concernant cette politique, vous pouvez nous écrire à :{" "}
          <a href="mailto:privacy@goodeez.fr">privacy@goodeez.fr</a>.
        </p>
      </section>
    </div>
  );
}
