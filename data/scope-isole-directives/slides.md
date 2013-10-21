
!SLIDE cover ==========================================

![](../AngularJS-large.png)
### Meetup ngParis - 21 octobre 2013

<br/>

## Attributs et scopes isolés
## dans les directives

<br/><br/>
<p class="right big">Thierry Chatel</p>

!SLIDE ===================================================

![](isolation.jpg)
### _L'isolation des scopes ne donne droit à aucun crédit d'impôt._



!SLIDE subsection ===================================================

# définitions

!SLIDE ===================================================

![](scopes.png)

!SLIDE ===================================================

    <body ng-app="app" ng-controller="AppCtrl">
      <div ng-controller="HeaderCtrl">
        ...
      </div>

      <ng-view></ng-view>

      <div ng-controller="FooterCtrl">
         ...
      </div>
    </body>



!SLIDE ===================================================

# scope et attributs
# liés à <span class="red">**l'élément**</span>



!SLIDE subsection ===================================================

# 3 options pour le scope


!SLIDE bullets big ===================================================

* <span class="blue">false</span> : rien
* <span class="blue">true</span> : scope enfant
* <span class="blue">{...}</span> : scope isolé

!SLIDE ===================================================

![](heritage.png)

!SLIDE bullets ===================================================

# Le scope isolé

* a un parent
* n'hérite pas des propriétés du parent

!SLIDE ===================================================

## _seul cas où_
# <span class="big">`scope.$parent`</span>
## _peut être pertinent_

!SLIDE ===================================================

![](panneaux.png)



!SLIDE subsection small ===================================================

# à quoi sert un scope isolé ?

!SLIDE ===================================================

![](etiquette.png)

# nommage local des paramètres


!SLIDE bigger ===================================================

    module.directive('google-maps',
                     function factory() {
        return {
            scope: {
                center: '=center',
                zoom: '=zoom'
            },

            ...


!SLIDE bigger ===================================================

    function copy(source, destination) {
        ...
    }

!SLIDE ===================================================

# pas de risque d'impact
# sur le scope parent




!SLIDE subsection small ===================================================

# cas d'utilisation d'un
# scope isolé

!SLIDE ===================================================

![](widget.png)

# widget

!SLIDE ===================================================

<span class="biggest">`<google-maps></google-maps>`</span>
<br/><br/>

# élément sans contenu



!SLIDE subsection ===================================================

# bindings du scope isolé


!SLIDE bullets big ===================================================

# 3 types d'attributs

* texte
* expression valeur
* expression action


!SLIDE big ===================================================

# <span class="biggest">@</span>
## attribut texte

    scope: { prop1: '@attr1' },

!SLIDE bullets small ===================================================


    <person name="{{user.firstName}} {{user.lastName}}"/>

<br/>

    scope: {
        name: '@'
    }


* expressions entre {{...}}
* binding <span class="red">**mono**</span>directionnel

!SLIDE big ===================================================

# <span class="biggest">=</span>
## expression valeur

    scope: { prop1: '=attr1' },

!SLIDE bullets small ===================================================

    <person name="user.lastName"/>

<br/>

    scope: {
        name: '='
    }

* pas de {{...}} dans l'attribut
* binding <span class="red">**bi**</span>directionnel





!SLIDE big ===================================================

# <span class="biggest">&</span>
## expression action

    scope: { prop1: '&attr1' },

!SLIDE bullets small ===================================================

    <delete-button action="remove(user)"/>

<br/>

    scope: {
        action: '&'
    }

* pas de {{...}} dans l'attribut
* propriété : fonction
* surcharger des données du scope : `scope.action({user: previousUser})`



!SLIDE subsection ===================================================

# et sans scope isolé ?

!SLIDE big ===================================================

    link: function (scope, element, attrs, ctrl) {
        ...
    }

!SLIDE big ===================================================

# attribut texte (<span class="bigger red">@</span>)

    attrs.xxx

<br/>

    attrs.$observe('xxx', function(value) {
        ...
    });

!SLIDE big ===================================================

# expression valeur (<span class="bigger red">=</span>)

    scope.$watch(attrs.xxx,
                function(newVal, oldVal) {
        ...
    });

<br/>

    $parse(attrs.xxx).assign(scope, value);

!SLIDE big ===================================================

# expression action (<span class="bigger red">&</span>)

    $parse(attrs.xxx)(scope, locals)



!SLIDE subsection small ===================================================

# démo :
# widget Google Maps



