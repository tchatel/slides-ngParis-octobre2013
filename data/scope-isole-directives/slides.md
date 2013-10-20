
!SLIDE "Formation AngularJS" chapter ==========================================

![](../AngularJS-large.png)
### Chapitre 0
## Langage JavaScript


!SLIDE "Langage JavaScript" ===================================================

* interprété
    * compilateurs “Just In Time”
* orienté objet
    * tout est objet, sauf quelques types primitifs
    * les types primitifs sont automatiquement convertis en objets lorsque c'est nécessaire (autoboxing)
* sans classes
    * les objets sont indépendants, sans structure figée
* non typé
    * on peut avoir n'importe quelle donnée dans :
        * une variable
        * une propriété d'un objet
        * un élément d'un tableau
        * les paramètres ou la valeur de retour d'une fonction
* les fonctions sont de vrais objets
    * elles peuvent être stockées dans une variable, comme propriété d'un objet, comme élément d'un tableau
    * elles peuvent être passées comme paramètre à une fonction
    * elles peuvent être renvoyées par une fonction


!SLIDE "Quel JavaScript ?" ====================================================

* LiveScript créé par Brendan Eich pour Netscape Navigator 2.0
    * renommé en JavaScript

* Norme ECMAScript
    * **ES5** : décembre 2009
        * mode strict, getters et setters, JSON, etc.
    * **ES6** “Harmony” : en cours de spécification
        * classes, modules, etc.

* Différences entre les implémentations dans les navigateurs web
    * DOM : spécification du W3C
    * ajouts non standards dans les différents navigateurs web

* Autres utilisations de JavaScript
    * serveur Node.js
    * bases de données MongoDB, CouchDB
    * ActionScript dans Flex


!SLIDE "Syntaxe JavaScript" ===================================================

* Semblable à la syntaxe Java (issue du C).

        "use strict";

        function multiplicative() {
            var left = unary();
            var token;
            while ((token = expect('*','/','%'))) {
                left = binaryFn(left, token.fn, unary());
            }
            return left;
        }

* `var` pour déclarer une variable (non typée).
* Mode strict indiqué par la chaîne de caractères **`"use strict"`** en tout début de fichier
    * ou au début d'une fonction

!SLIDE "Syntaxe JavaScript" ===================================================

* ; en fin d'instruction
* pouvant être omis _(déconseillé)_

            function square(x) {
                var n = +x
                return n * n
            }


!SLIDE "Semicolon insertion" ===================================================

* Règles d'insertion automatique des ;
    * à la fin d'une ligne, du fichier, ou avant une }
    * seulement si le token suivant crée une erreur de syntaxe
    * jamais dans l'entête d'une boucle _for_, ni si le ; crée une instruction vide
    * insertion systématique là où une fin de ligne est interdite :

        * PostfixExpression :
            * `LeftHandSideExpression [no LineTerminator here] ++`
            * `LeftHandSideExpression [no LineTerminator here] --`
        * ContinueStatement :
            * `continue [no LineTerminator here] Identifier ;`
        * BreakStatement :
            * `break [no LineTerminator here] Identifier ;`
        * ReturnStatement :
            * `return [no LineTerminator here] Expression ;`
        * ThrowStatement :
            * `throw [no LineTerminator here] Expression ;`


!SLIDE "Semicolon insertion" ===================================================

* Conséquences de l'insertion automatique des ;
    * Le code suivant provoque une erreur de syntaxe :

                return
                {
                   s: 'azerty',
                   n: 123
                }

        * JS rajoute un ; juste après `return`

    * Mettre plutôt les accolades ouvrantes en fin de ligne

                return {
                   s: 'azerty',
                   n: 123
                }


!SLIDE "5 types primitifs" ====================================================

* boolean, number, string, undefined, null
    * _**undefined**_ représente l'absence de valeur
    * _**null**_ sert à représenter une valeur explicitement nulle
    * un seul type numérique (sur 8 octets)
    * pas de type caractère

* Les booléens, nombres et chaînes de caractères sont :
    * immuables
    * convertis à la volée en objets (Boolean, Number, String) quand c'est nécessaire

            var n = 5;
            n.toString();

            var s = "hello";
            s.length;


!SLIDE "5 types primitifs" ====================================================

* Eviter d'utiliser explicitement les types objets Boolean, Number et String

        var a = new String('AZERTY');
        var b = new String('AZERTY');
        a == 'AZERTY'; // true
        a === 'AZERTY'; // false
        a == b; // false
        a === b; // false
        typeof 'AZERTY'; // "string"
        typeof a; // "object"


!SLIDE "Comparaisons strictes ou non" =========================================

* `===` Comparaison stricte (sans conversion automatique)
    * `true` pour deux données primitives du même type et de même valeur, c'est-à-dire :
        * `true` pour deux booléens (primitifs) égaux
        * `true` pour deux nombres (primitifs) égaux
        * `true` pour deux chaînes de caractères (primitives) égales
    * `true` pour deux références au même objet
    * `false` dans tous les autres cas


* `==` Comparaison avec conversion automatique de type (à utiliser avec prudence)
    * si l'un des deux opérandes est un nombre ou un booléen, essaie de convertir les deux opérandes en nombres
    * sinon, si l'un des deux opérandes est une chaîne de caractères, essaie de convertir les deux opérandes en chaînes
    * sinon compare les références des objets

            1 == true;                      // true
            1 == "2";                       // false
            2 == "2";                       // true
            "1" == true;                    // true
            "true" == true;                 // false
            1 == new Number(1);             // true
            new Number(1) == new Number(1); // false




!SLIDE "Les objets" ===========================================================

* Les objets JavaScript sont des tableaux associatifs (clefs / valeurs)
    * clef : chaîne de caractères = nom de la propriété
    * valeur quelconque (non typé)

* Pas de notion de visibilité : toutes les propriétés sont publiques

* 2 notations équivalentes
    * `obj.clef`
    * `obj['clef']`

* Notation entre crochets :
    * toujours possible, même avec un nom de propriété dynamique
    * n'importe quelle chaîne est autorisée comme nom de propriété

            obj['a.b']

* Notation avec un point :
    * possible pour un nom de propriété en dur, qui est un identifiant valide

            obj.a.b // N'a pas le même sens !


!SLIDE "Les objets" ===========================================================

* Créer un objet, avec `{...}`

        var DATE_FORMATS = {
          yyyy: dateGetter('FullYear', 4),
            yy: dateGetter('FullYear', 2, 0, true),
            MM: dateGetter('Month', 2, 1),
             M: dateGetter('Month', 1, 1),
            dd: dateGetter('Date', 2),
            HH: dateGetter('Hours', 2),
            hh: dateGetter('Hours', 2, -12),
            mm: dateGetter('Minutes', 2),
            ss: dateGetter('Seconds', 2),
             Z: timeZoneGetter
        };


!SLIDE "Les objets" ===========================================================

* Créer un objet, avec `{...}`

        var newTemplateAttrs = {$attr: {}};

    <br/>

        var locals = {
            $scope: scope,
            $element: $element,
            $attrs: attrs,
            $transclude: boundTranscludeFn
        };


!SLIDE "Les objets" ===========================================================

* Ajouter ou modifier une propriété

        angular.element = jqLite;
    <br/>
        dst[key] = src[key];

* Supprimer une propriété

        delete params[key];
    <br/>
        delete event.stopPropagation;


!SLIDE "Exercice JS01" =========================================================

* Créer un objet représentant une personne
    * avec 2 propriétés _firstName_ et _lastName_
    * avec une fonction _fullName()_ qui renvoie le nom complet

* Modifier le prénom ou le nom, et vérifier que ça marche encore


!SLIDE "Les tableaux" =========================================================

* Les tableaux sont des objets JavaScript, initialisés avec `[...]`
    * comme tous les objets, ils ont des propriétés dont les noms sont des chaînes de caractères


    var empyArray = [];

    var a = ['this', 'is', 'an', 'array'];
    a[1]; // "is"


!SLIDE "Les tableaux" =========================================================

* Certaines propriétés sont considérées comme des index numériques
    * si le nom de la propriété est la **représentation texte d'un entier positif**
    * index : "0", "1", "2", "15"
    * pas index : "-1", "01", "3.14"

            var a = ['this', 'is', 'an', 'array'];
            Object.keys(a);  // ["0", "1", "2", "3"]
            a[3]; // "array"
            a['3']; // "array"

* Le tableau a une propriété _**length**_ toujours strictement supérieure au plus grand des index
    * si nécessaire, lors de l'ajout d'un nouvel index, length prend comme valeur l'entier suivant le nouvel index
    * si la valeur de length est modifiée, tous les index de valeur supérieure ou égale à length sont supprimés

            a[5] = 'new';
            a.length;  // 6
            a.length = 2;
            a; // ["this", "is"]
            a.length = 0;
            a; // []


!SLIDE "Les tableaux" =========================================================

* Méthodes modifiant le contenu d'un tableau
    * `array.push(element1, element2, ..., elementN)` : ajoute un ou plusieurs éléments à la fin du tableau
    * `array.pop()` : enlève le dernier élément du tableau
    * `array.shift()`: enlève le premier élément d'un tableau
    * `array.unshift(element1, ..., elementN)` : ajoute un ou plusieurs éléments au début du tableau
    * `array.splice(index, howMany[, element1[, ...[, elementN]]])` : supprime des éléments et/ou en ajoute de nouveaux
    * `array.sort([compareFunction])` : trie les éléments à l'intérieur du tableau
    * `array.reverse()` : inverse l'ordre des éléments d'un tableau

* Méthodes créant un nouveau tableau
    * `array.concat(value1, value2, ..., valueN)` : renvoie un nouveau tableau égal à la concaténation du tableau courant
         et des tableaux passés en paramètres (les paramètres qui ne sont pas des tableaux sont ajoutés comme des éléments)
    * `array.slice(begin[, end])` : renvoie une copie d'une portion du tableau courant


!SLIDE "Les tableaux" =========================================================

* Méthodes ajoutées dans ECMAScript 5
    * `array.indexOf(searchElement[, fromIndex])` : renvoie le premier index où l'élément est trouvé
    * `array.lastIndexOf(searchElement[, fromIndex])` : renvoie le dernier index où l'élément est trouvé
    * `array.forEach(callback[, thisArg])` : exécute une fonction callback pour chaque élément du tableau

    * `array.every(callback[, thisObject])` : renvoie true si tous les éléments du tableau passent le test de la fonction callback
    * `array.some(callback[, thisObject])` : renvoie true si au moins un des éléments du tableau passe le test de la fonction callback
    * `array.filter(callback[, thisObject])` : renvoie un tableau contenant les éléments qui passent le test de la fonction callback
    * `array.map(callback[, thisArg])` : renvoie un tableau avec le résultat de la fonction callback pour chacun des éléments du tableau de départ
    * `array.reduce(callback[, initialValue])` : renvoie la valeur calculée en appliquant une fonction avec un accumulateur
     à chaque élément du tableau, de gauche à droite


!SLIDE "Exercice JS02" =========================================================

* Initialiser un tableau contenant une série de nombres.
* Ajouter au tableau deux méthodes qui renvoient le plus grand nombre du tableau :
    1. maxFor() qui utilise une boucle _for_
    2. maxReduce() qui utilise la méthode _reduce_


!SLIDE "Les fonctions" ========================================================

* Deux façons de définir une fonction.

* **Instruction** _function_

        function fn(arg1, arg2) {
            ...
        }

    * doit commencer par le mot-clef _function_
    * le nom est obligatoire

* **Expression** _function_

        return function fn(arg1, arg2) {
            ...
        };

    * le mot-clef _function_ n'est pas en début d'instruction
    * le nom est facultatif (utile pour une fonction récursive)


!SLIDE "Function scope" =======================================================

* En JavaScript c'est la fonction qui définit la portée des variables (_“function scope”_)
    * contrairement au _“block scope”_ de Java

* Une variable déclarée par _var_ l'est pour toute la fonction qui la contient
    * même avant la ligne où se trouve le mot-clef _var_

            function fn(array, arg2) {
                // les variables i, element sont déjà déclarées ici
                for (var i = 0 ; i < array.length ; i++) {
                    var element = array[i];
                    if (element.max > 0) {
                        var label = element.label;
                        // ...
                    } else {
                        // ...
                    }
                }
            }

* Une variable déclarée hors de toute fonction devient une propriété de l'objet global
    * dans un navigateur web, l'objet global est accessible sous le nom de **`window`**


!SLIDE "Fonctions internes" ===================================================

* **instruction** _function_
    * définies dès le début de la fonction qui les contient
    * ou dès le début du fichier si hors de toute fonction

* **expression** _function_
    * définies seulement après l'évaluation de l'expression


    // f est utilisable ici

    function f() {
        // f1 est utilisable ici
        // pas f2

        function f1() {
            // ...
        }
        var f2 = function () {
            // ...
        };
    }


!SLIDE "First class objects" ==================================================

* Les fonctions sont de vrais objets JavaScript

* On peut :
    * mettre une fonction dans une variable
    * mettre une fonction en propriété d'un objet
    * mettre une fonction dans un tableau
    * passer une fonction comme paramètre d'une autre fonction
    * renvoyer une fonction

* On peut ajouter des propriétés à une fonction.

        function myController($loc, $log) {
            // ...
        }
        // which services to inject ?
        myController.$inject = ['$location', '$log'];


!SLIDE "Exercice JS03" =========================================================

1. Ecrire une fonction récursive de calcul de la factorielle.

2. Optimiser la fonction, en mettant en cache les résultats déjà calculés.


!SLIDE "4 façons d'invoquer une fonction" =====================================

* Appel de fonction classique

* Appelée comme une méthode

* Appelée comme un constructeur

* Avec `call` ou `apply`


!SLIDE "1ère façon : appel de fonction classique" =============================

* **1ère façon** : appel classique


    data = transformData(response.data, response.headers, respTransformFn);


* Paramètres
    * les paramètres manquant valent _undefined_
    * les paramètres en trop sont ignorés, mais restent accessibles via l'objet _arguments_
    * _arguments_ est un objet ressemblant à un tableau, qui permet d'accéder à ses arguments à l'intérieur d'une fonction
        * `arguments.length`
        * `arguments[0]` : valeur du premier paramètre
        * `arguments[1]` : valeur du second paramètre
        * ...

* **`this`** est égal à
    * **`undefined`** en mode strict
    * l'objet global en mode normal (déconseillé)


!SLIDE "Exercice JS04" =========================================================

* Ecrire une fonction qui prend un nombre quelconque de paramètres numériques, et qui renvoie leur somme.


!SLIDE "2ème : fonction appelée comme méthode" =============================

* **2ème façon** : fonction appelée comme une **méthode**

    * la fonction est une propriété d'un objet
    * elle est appelée en faisant **référence explicitement à la propriété de l'objet**

            filtered.push(value);
        <br/>
            filtered['push'](value);

    * dans la fonction, **`this`** est égal à l'objet qui précède la propriété

* Attention : la valeur de **this** est perdue dans les fonctions internes à une méthode

        controller: function($element, $scope, $attrs) {
            var self = this;
            $scope.$on('$destroy', function() {
                self.renderUnknownOption = noop;
            });
        },


!SLIDE "Exercice JS05" =========================================================

* Créer un objet, avec une methode sans paramètre qui écrit un message dans la console.
* Fournir cette méthode en paramètre de la fonction `setTimeout()`.
    * Que se passe-t-il ?
* Ajouter au même objet une seconde méthode qui écrit dans la console un message qui est stocké dans l'objet.
* Fournir cette seconde méthode en paramètre de la fonction `setTimeout()`.
    * Que se passe-t-il ?
    * Que peut-on écrire pour que ça marche ?


!SLIDE "3ème : fonction appelée comme constructeur" =============================

* **3ème façon** : appel d'une fonction comme constructeur

        var obj = new Fn(arg1, arg2);

    * n'importe quelle fonction peut être utilisée comme constructeur (mais ça n'a pas forcément de sens)
    * par convention, le nom des constructeurs commence par une majuscule

* JS crée un nouvel objet
    * dont le prototype est **`Fn.prototype`**
    * qui vérifie **`obj.constructor === Fn`**
        * parce que la propriété _constructor_ est définie dans son prototype `Fn.prototype`
    * qui vérifie **`obj instanceof Fn`**
        * _instanceof_ vérifie si Fn.prototype est dans la chaîne des prototypes de l'objet

* ... puis appelle la fonction utilisée comme constructeur
    * où **`this`** référence le nouvel objet

* ... et le constructeur ne renvoie rien.
    * s'il renvoie un type primitif, son retour est ignoré
    * s'il renvoie un objet, son retour remplace l'objet créé par **`new`** (fortement déconseillé !)


!SLIDE "3ème : fonction appelée comme constructeur" =============================

* Ajout de fonctions au prototype

        Fn.prototype.functionName = function (arg1, arg2, arg3) {
            // ...
        };

    * fonctions partagées par tous les objets liés à ce prototype
    * même ceux créés avant l'ajout de la fonction au prototype


* Inconvénients des constructeurs
    * risque d'appeller la fonction sans le **new** sans s'en rendre compte
    * en mode strict, **this** est alors indéfini, ce qui devrait provoquer une erreur


!SLIDE "Exercice JS06" =========================================================

* Créer un constructeur `Person(firstName, lastName)`
    * qui définit deux propriétés _firstName_ et _lastName_
    * avec les valeurs passées en paramètres du constructeur

* Ajouter une fonction `fullName()` au prototype.

* Vérifier que la fonction `fullName()` fonctionne pour tous les objets créés avec ce constructeur
    * même ceux créés avant l'ajout de la fonction au prototype


!SLIDE "4ème façon : call & apply" =============================

* Appel d'une fonction, en spécifiant la valeur de **this** et les paramètres un à un

        fn.call(thisArg, arg1, arg2, arg3);

    * on peut passer _undefined_ ou _null_ comme valeur de _this_

* Appel d'une fonction, en spécifiant la valeur de **this** et un tableau de paramètres

        fn.apply(thisArg, [arg1, arg2, arg3]);

    * on peut passer _undefined_ ou _null_ comme valeur de _this_


* Exemple :

    * la méthode **each()** de jQuery positionne **this** successivement sur chaque élément HTML

            jQuery('a').each(function(index, value) {
                var ihref = $(this).attr('href');
                if (ihref.indexOf("http") >= 0) {
                    console.log(ihref+'<br/>');
                }
            });


!SLIDE "Closure" ==============================================================

* Toute fonction JavaScript a accès aux données du scope dans lequel elle a été définie.

        controller: function($element, $scope, $attrs) {
            var self = this;
            $scope.$on('$destroy', function() {
                self.renderUnknownOption = noop;
            });
        },

    * `self` est accessible dans la fonction interne car c'est une variable du scope dans lequel la fonction interne a été définie

* Fonctionnement

    * la fonction garde une référence vers les données du scope (variables, paramètres et fonctions)
    * les données sont celles présentes dans le scope **au moment de l'exécution** de la fonction
        * pas au moment de sa définition (pas de copie de l'état du scope)

    * une fonction globale a accès aux données du scope global
    * une fonction interne a accès aux données de son scope de définition
        * = celles de la fonction dans laquelle elle est définie
        * ... qui récursivement a elle-même accès aux données de son scope de définition
        * ... et ce jusqu'au scope global


!SLIDE "Closure" ==============================================================

* Exemple

        'use strict';
        var v0 = 0;
        function f1(arg1) {
            var v1 = 1;
            return function f2(arg2) {
                var v2 = 2;
                return function f3(arg3) {
                    var v3 = 3;
                    console.log(v0, v1, v2, v3);
                    console.log(arg1, arg2, arg3);
                }
            }
        }
        var f2 = f1('aaa');
        var f3 = f2('bbb');
        f3('ccc');


!SLIDE "Exercice JS07" =========================================================

* Utiliser la fonction _setTimeout(fn, delay)_ dans une boucle _for_ pour :
    * afficher 1 dans la console au bout de 1 seconde
    * afficher 2 dans la console au bout de 2 secondes
    * afficher 3 dans la console au bout de 3 secondes
    * ...
    * afficher 10 dans la console au bout de 10 secondes


!SLIDE "Anonymous wrapper, immediate function" ================================

* Fonction anonyme définie et exécutée immédiatement
    * mise entre parenthèses, pour que ce soit une expression et non une instruction
    * avec ou sans arguments

            (function (arg1, arg2) {
                // ...
            })(a1, a2);
        <br/>
            (function (arg1, arg2) {
                // ...
            }(a1, a2));
        <br/>
            (function () {
                // ...
            })();



!SLIDE "Anonymous wrapper" ===================================================

* Usage : créer un scope contenant les variables et fonctions
    * évite de polluer le scope global
    * encapsuler le contenu de chaque fichier dans un anonymous wrapper

* Usage : import de variables globales ou accessibles par closure
    * avec leur valeur au moment de la définition et l'exécution du wrapper


!SLIDE "Anonymous wrapper" ===================================================

* Usage : pattern “Module”
    * données privées au module
    * renvoie un objet avec des propriétés et méthodes publiques, qui accèdent aux données privées par closure

            var module = (function () {

                var module = {},
                    privateVariable = 1;

                function privateMethod() {
                    // ...
                }

                module.moduleProperty = 1;
                module.moduleMethod = function () {
                    // ...
                };

                return module;

            }());



!SLIDE "Exercice JS08" =========================================================

* Créer directement un objet compteur
    * sans propriété publique
    * initialisé à 0
    * avec une fonction `get()` pour récupérer sa valeur courante
    * avec une fonction `inc(i)` pour incrémenter sa valeur de `i` (de 1 par défaut)

* Créer une fonction (factory) permettant de créer un compteur, en choisissant sa valeur initiale.

* Créer un constructeur permettant de créer un compteur, en choisissant sa valeur initiale.


!SLIDE "Chaîne des prototypes" ===============================================

* Recherche d'une propriété _(get)_
    * dans l'objet courant
    * puis dans son prototype
    * puis dans le prototype de son prototype
    * puis dans le prototype du prototype de son prototype
    * ...

* Affectation d'une valeur à une propriété _(set)_
    * modifie ou crée la propriété toujours dans l'objet courant
    * même si c'était une propriété héritée d'un prototype

* Accéder au prototype d'un objet :
    * ES5 : `Object.getPrototypeOf(obj)`
    * pas standard : `obj.__proto__`

* Racine de la chaîne des prototypes : `Object.prototype`

        Object.getPrototypeOf(Object.prototype); // null


!SLIDE "Héritage par prototype" ===============================================

* Héritage entre 2 types d'objets (constructeurs) définis par l'utilisateur

        function Parent() {
            this.level = 'parent';
        }

        function Child() {
            this.level = 'child';
        }
        Child.prototype = new Parent();
        Child.prototype.constructor = Child;

        var ch1 = new Child();
        var ch2 = new Child();

* C'est rarement utile.
    * l'utilité est liée aux classes et au typage statique, qui n'existent pas en JavaScript


!SLIDE "Opérateurs && et ||" ===============================================

* && et || ne renvoient pas un booléen, mais la valeur du dernier opérande évalué
    * avec court-circuit de l'évaluation

* `val1 && val2`
    * si `val1` est équivalent à `true`, renvoie `val2`
    * si `val1` est équivalent à `false`, renvoie `val1`
    * “`val1` **alors** `val2`”
    * exemple : appelle une méthode si l'objet n'est pas nul
            obj && obj.fn()

* `val1 || val2`
    * si `val1` est équivalent à `true`, renvoie `val1`
    * si `val1` est équivalent à `false`, renvoie `val2`
    * “`val1` **sinon** `val2`”
    * exemple : valeur par défaut
            arg1 || {}


!SLIDE "Boucles for et for...in" ===============================================

* `for...in` :
    * pour itérer sur les noms des propriétés d'un objet

            for (var propertyName in obj) {
                var propertyValue = obj[propertyName];
                // ...
            }

    * ignorer les propriétés héritées du prototype :

            for (var propertyName in obj) {
                if (obj.hasOwnProperty(propertyName)) {
                    var propertyValue = obj[propertyName];
                    // ...
                }
            }
    * l'ordre d'itération sur les propriétés n'est pas garanti

* Lister les propriétés (non héritées) d'un objet
    * `Object.keys(obj)` (ES5) : tableau des noms des propriétés énumérables de l'objet
    * `Object.getOwnPropertyNames(obj)` (ES5) : tableau des noms des propriétés énumérables ou non de l'objet

!SLIDE "Boucles for et for...in" ===============================================

* Ne jamais utiliser `for...in` pour itérer sur les éléments d'un tableau

    * aucune garantie sur l'ordre
    * les éléments valant `undefined` sont sautés
    * ça itère aussi sur les autres propriétés (non numériques) éventuellement ajoutées au tableau

* Boucle `for` numérique pour itérer sur les éléments d'un tableau

            for (var i = 0 ; i < arr.length ; i++) {
                var element = arr[i];
                // ...
            }


!SLIDE "Exceptions" ===========================================================

* `try...catch`

        try {
            // ...
        } catch (e) {
            // ...
        }

* `try...catch...finally`

        try {
            // ...
        } catch (e) {
            // ...
        } finally {
            // ...
        }

!SLIDE "Exceptions" ===========================================================

* Déclencher une exception : `throw`
    * l'exception est une donnée quelconque : objet, chaîne de caractère, nombre

            throw "Error2"; // generates an exception with a string value

    * objet utilisateur avec une méthode `toString()`

            function ZipCode(zip) {
               if (/[0-9]{5}([- ]?[0-9]{4})?/.test(zip)) {
                    // ...
               } else {
                  throw new ZipCodeFormatException(zip);
               }
            }
            function ZipCodeFormatException(value) {
               this.value = value;
               this.message = "does not conform to the expected format for a zip code";
               this.toString = function() {
                  return this.value + this.message
               };
            }


!SLIDE "Exceptions" ===========================================================

* Constructeur prédéfini : `Error`

        new Error(message);

* Autres types d'erreurs standards de JavaScript

    * `EvalError`
    * `RangeError`
    * `ReferenceError`
    * `SyntaxError`
    * `TypeError`
    * `URIError`


!SLIDE "Exercice JS09" =========================================================

* Opération “reduce” sur un arbre

* Créer un constructeur `Node`
    * avec un paramètre qui alimente la valeur du noeud
    * créer une méthode `addChild` permettant d'ajouter un ou plusieurs noeuds enfants

* Créer une méthode `reduce`, disponible sur tous les noeuds, qui prend deux paramètres obligatoires :
    * une fonction de calcul du type `fn(previousValue, currentNode, root)`
    * une valeur initiale
    * La méthode `reduce` applique la fonction sur tous les noeuds de l'arbre, en lui passant dans cet ordre :
        * le résultat calculé jusque là
        * le noeud à prendre en compte
        * la racine du sous-arbre sur lequel se fait le calcul

* Construire un arbre avec des valeurs numériques, et tester
    * avec une fonction de calcul du nombre d'éléments d'un sous-arbre

* Modifier la méthode `reduce`, pour qu'elle prenne la valeur du noeud auquel elle est appliquée comme valeur initiale
  si celle-ci n'est pas définie.

* Tester avec deux autres fonctions de calcul :
    * de la valeur minimale dans un sous-arbre
    * de la valeur maximale dans un sous-arbre







