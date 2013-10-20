
!SLIDE cover ==========================================

![](../AngularJS-large.png)
### Meetup ngParis - 21 octobre 2013

<br/>

## Bon usage des services

<br/><br/>
<p class="right big">Thierry Chatel</p>



!SLIDE ===================================================

# <span class="biggest">> 90 %</span> <span class="smallest">du code</span>
# dans les services



!SLIDE subsection ===================================================

# Qu'est-ce qu'un service ?

!SLIDE bullets big ===================================================

## un service =

* nom
* singleton

!SLIDE ===================================================

# toujours le même objet /
# la même valeur primitive

!SLIDE ===================================================

# injection des dépendances
### instanciation si nécessaire




!SLIDE subsection ===================================================

# Que mettre en service ?


!SLIDE bullets  ===================================================

* tout le code métier
* tout le code de présentation
* les requêtes
* le modèle
* etc.


!SLIDE big ===================================================

# 1. le code métier

!SLIDE ===================================================

# isoler chaque fonctionnalité

!SLIDE image ===================================================

![](rugby.jpg)


!SLIDE big ===================================================

# 2. le code de présentation

!SLIDE ===================================================

# cache des critères

!NOTES -----------------------------------------------------

TODO


!SLIDE big ===================================================

# 3. les requêtes

!SLIDE bullets ===================================================

# service asynchrone

* demander un callback
* renvoyer un objet/tableau alimenté plus tard
* renvoyer une promise


!SLIDE big ===================================================

# 4. le modèle

!SLIDE bullets  ===================================================

# service statefull

* données
* traitements

!SLIDE bullets ===================================================

# service stateless

* bibliothèque de fonctions




!SLIDE subsection ===================================================

# Découper les services

!SLIDE ===================================================

# $http & $httpBackend

!SLIDE ===================================================

# $route & $location

!SLIDE bullets ===================================================

# découpage en couches

* traitements sur les données
* communication

!SLIDE bullets ===================================================

# service simple et isolé

* facile à tester
* facile à mocker



!SLIDE subsection ============================================

# les 5 règles d'or
# des services

!SLIDE regle ===================================================

# Règle n°1
<br/>
## Jamais de logique ou de
## règle métier dans les
## contrôleurs et les vues.
### A faire dans un service.

!SLIDE regle ===================================================

# Règle n°2
<br/>
## Oublier les événements !
### Préférer les services dans 99,9 % des cas.

!SLIDE regle ===================================================

# Règle n°3
<br/>
## Dans le doute, faire un service.

!SLIDE regle ===================================================

# Règle n°4
<br/>
## Quand un service
## ne semble pas approprié,
## faire quand même un service.

!SLIDE regle ===================================================

# Règle n°5
<br/>
## Dans tous les autres cas,
## faire un service.




!SLIDE subsection ===================================================

# Question de noob

!SLIDE big ===================================================

## _“Comment faire communiquer deux contrôleurs ?”_

!SLIDE  ===================================================

![](devise-shadok.jpg)

!SLIDE big ===================================================

## On ne le fait pas.
### Les deux contrôleurs utilisent le même service.



!SLIDE subsection ===================================================

# Exemple 1 : cache des critères de recherche

!SLIDE big ===================================================

## service = objet vide

    module.value('search', {});

!SLIDE big ===================================================

## publié dans le scope

    $scope.search = search;

!SLIDE big ===================================================

## bindings dans le service

    <input name="filter" ng-model="search.filter"/>

!SLIDE big ===================================================

## cache plus sophistiqué
### utiliser le service $cacheFactory



!SLIDE subsection ===================================================

# Exemple 2 : utilisateur connecté

!SLIDE big ===================================================

## service `'user'`

### données

    profile:  {
        firstame: "Thierry",
        lastname: "Chatel"
    }

!SLIDE big ===================================================

## service `'user'`

### fonctions

    hasRole: function (role) {
        return ...
    }

!SLIDE big ===================================================

## publié dans $rootScope

### entièrement
### ou partiellement

    viewObject: {
        ...
    }



!SLIDE subsection ============================================

# Exemple 3 : erreurs et notifications

!SLIDE bullets ===================================================

* service `'notifications'`
* service `'errors'`
* service `'$exceptionHandler'` surchargé
* intercepteur $http

!SLIDE bullets ===================================================

## service `'notifications'`

* données : message courant, <span class="small">retiré après quelques secondes</span>
* gestion du _Undo_
* la vue affiche simplement le message courant

!SLIDE bullets ===================================================

## service `'errors'`

* appelle le service `'notifications'`



!SLIDE subsection ============================================

# Exemple 4 : entités persistentes

!SLIDE ============================================

# pattern Repository
# ou pattern Active Record

!NOTES -----------------------------------------------------

TODO



!SLIDE ===================================================

![](shadoks.jpg)






