import React from 'react';

import { NavLink } from "react-router-dom";

class Cgu extends React.Component {
    render() {
        return (
            <div className='m-auto'>
                <NavLink to="/">
                    <div className='align-items-center rounded btn-design position-absolute pos-retour cursor-pointer'>
                        Retour
                    </div>
                </NavLink>
                <div className='header-cgu p-3 text-center'>CGU</div>
                <div className='p-2 m-2' style={{maxWidth: "800px"}}>
                    <div className='rounded p-2 bg-white text-primary mb-2 mt-1'>
                        Accès au site
                    </div>
                    <div className='text-cgu'>
                        Le site https://micro-games.fr permet à l'Utilisateur un accès gratuit aux services suivants :
                        Le site internet propose les services suivants :
                        Jouer avec ses amis, mini-jeux
                        Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les
                        frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion
                        Internet, etc.) sont à sa charge.
                    </div>
                    <div className='rounded p-2 bg-white text-primary mb-2 mt-1'>
                        Collecte des données
                    </div>
                    <div className='text-cgu'>
                    Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la
mesure où il ne collecte aucune donnée concernant les Utilisateurs.
                    </div>
                    <div className='rounded p-2 bg-white text-primary mb-2 mt-1'>
                        Propriété intellectuelle
                    </div>
                    <div className='text-cgu'>
                    Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet
d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
1
L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des
différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé,
toute utilisation à des fins commerciales et publicitaires est strictement interdite.
Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation
expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2
et suivants du Code de la propriété intellectuelle.
Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur qui
reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
                    </div>
                    <div className='rounded p-2 bg-white text-primary mb-2 mt-1'>
                    Responsabilité
                    </div>
                    <div className='text-cgu'>
                    Les sources des informations diffusées sur le site https://micro-games.fr sont réputées fiables mais le
site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle.
Malgré des mises à jour régulières, le site https://micro-games.fr ne peut être tenu responsable de la
modification des dispositions administratives et juridiques survenant après la publication. De même, le
site ne peut être tenue responsable de l’utilisation et de l’interprétation de l’information contenue dans
ce site.
Le site https://micro-games.fr ne peut être tenu pour responsable d’éventuels virus qui pourraient
infecter l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à l’accès, ou
au téléchargement provenant de ce site.
La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et
insurmontable d'un tiers.
                    </div>
                    <div className='rounded p-2 bg-white text-primary mb-2 mt-1'>
                    Liens hypertextes
                    </div>
                    <div className='text-cgu'>
                    Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces
liens, il sortira du site https://micro-games.fr. Ce dernier n’a pas de contrôle sur les pages web sur
lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
                    </div>
                    <div className='rounded p-2 bg-white text-primary mb-2 mt-1'>
                    Cookies
                    </div>
                    <div className='text-cgu'>
                    L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement
sur son logiciel de navigation.
Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l’ordinateur de
l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site https://micro-games.fr.
Les cookies ne contiennent pas d’information personnelle et ne peuvent pas être utilisés pour identifier
quelqu’un. Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains
cookies expirent à la fin de la visite de l’Utilisateur, d’autres restent.
L’information contenue dans les cookies est utilisée pour améliorer le site https://micro-games.fr.
En naviguant sur le site, L’Utilisateur les accepte.
L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son
logiciel de navigation.
                    </div>
                    <div className='rounded p-2 bg-white text-primary mb-2 mt-1'>
                    Droit applicable et juridiction compétente
                    </div>
                    <div className='text-cgu'>
                    La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un
litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
Pour toute question relative à l’application des présentes CGU, vous pouvez joindre l’éditeur aux
coordonnées inscrites à l’ARTICLE 1.
                    </div>
                </div>
            </div>
        )
    }

}

export default Cgu;