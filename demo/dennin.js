var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dennin;
(function (Dennin) {
    var Splite = (function () {
        function Splite(element) {
            this.element = element;
        }
        Splite.create = function (position, size) {
            var element = document.createElement('splite');
            var splite = new Splite(element);
            splite.position = position;
            splite.size = size;
            return splite;
        };
        Splite.prototype.goLeft = function () { };
        Splite.prototype.goRight = function () { };
        Splite.prototype.doJump = function () { };
        Splite.prototype.doFall = function () { };
        Splite.prototype.doAttack = function () { };
        Splite.prototype.stopLeft = function () { };
        Splite.prototype.stopRight = function () { };
        Splite.prototype.stopJump = function () { };
        return Splite;
    }());
    Dennin.Splite = Splite;
    var PlayableSplite = (function (_super) {
        __extends(PlayableSplite, _super);
        function PlayableSplite() {
            _super.apply(this, arguments);
        }
        PlayableSplite.create = function (position, sie) {
            var playable = Splite.create(position, sie);
            playable.element.addEventListener('keydown', function (e) {
                if (playable.keyConfig === null || playable.keyConfig === undefined) {
                    return;
                }
                if (e.charCode === playable.keyConfig.goLeft) {
                    playable.goLeft();
                }
                else if (e.charCode === playable.keyConfig.goRight) {
                    playable.goRight();
                }
                else if (e.charCode === playable.keyConfig.doJump) {
                    playable.doJump();
                }
                else if (e.charCode === playable.keyConfig.doFall) {
                    playable.doFall();
                }
                else if (e.charCode === playable.keyConfig.doAttack) {
                    playable.doAttack();
                }
            });
            playable.element.addEventListener('keyup', function (e) {
                if (playable.keyConfig === null || playable.keyConfig === undefined) {
                    return;
                }
                if (e.charCode === playable.keyConfig.goLeft) {
                    playable.stopLeft();
                }
                else if (e.charCode === playable.keyConfig.goRight) {
                    playable.stopRight();
                }
                else if (e.charCode === playable.keyConfig.doJump) {
                    playable.stopJump();
                }
            });
            return playable;
        };
        PlayableSplite.prototype.setDefaultKeyConfig = function () {
            return this.setKeyConfig({
                goLeft: 37,
                goRight: 39,
                doJump: 38,
                doFall: 40,
                doAttack: 65
            });
        };
        PlayableSplite.prototype.setKeyConfig = function (newKeyConfig) {
            this.keyConfig = newKeyConfig;
            return this;
        };
        return PlayableSplite;
    }(Splite));
    Dennin.PlayableSplite = PlayableSplite;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var domController;
    function initDomController() {
        if (domController === null || domController === undefined) {
            domController = new Dennin.DOMController();
        }
    }
    function loadDOMs() {
        initDomController();
        domController.reload();
    }
    Dennin.loadDOMs = loadDOMs;
    function create(position) {
        if (position === void 0) { position = { x: 0, y: 0 }; }
        initDomController();
        var size = { width: 100, height: 100 };
        var newCaharacter = Dennin.Splite.create(position, size);
        domController.add(newCaharacter.element);
        return newCaharacter;
    }
    Dennin.create = create;
    function getDoms() {
        initDomController();
        return domController.bodyDoms;
    }
    Dennin.getDoms = getDoms;
    function bookmarklet() {
        loadDOMs();
        create();
    }
    Dennin.bookmarklet = bookmarklet;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var DOMController = (function () {
        function DOMController() {
        }
        DOMController.prototype.reload = function () {
            var doms = document.querySelectorAll("body *");
            this.bodyDoms = Array.prototype.slice.call(doms);
        };
        DOMController.prototype.add = function (dom) {
            this.bodyDoms.push(dom);
        };
        DOMController.prototype.remove = function (dom) {
            var index = this.bodyDoms.indexOf(dom);
            if (index >= 0) {
                this.bodyDoms.splice(index, 1);
            }
        };
        return DOMController;
    }());
    Dennin.DOMController = DOMController;
})(Dennin || (Dennin = {}));
