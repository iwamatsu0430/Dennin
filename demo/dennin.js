var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    function create(rect) {
        if (rect === void 0) { rect = { position: { x: 0, y: 0 }, size: { width: 100, height: 100 } }; }
        initDomController();
        var newCaharacter = Dennin.Splite.create(rect);
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
var Dennin;
(function (Dennin) {
    (function (SpliteEvent) {
        SpliteEvent[SpliteEvent["OnGoLeft"] = 0] = "OnGoLeft";
        SpliteEvent[SpliteEvent["OnGoRight"] = 1] = "OnGoRight";
        SpliteEvent[SpliteEvent["OnDoJump"] = 2] = "OnDoJump";
        SpliteEvent[SpliteEvent["OnDoFall"] = 3] = "OnDoFall";
        SpliteEvent[SpliteEvent["OnDoAttack"] = 4] = "OnDoAttack";
        SpliteEvent[SpliteEvent["OnCollisionWindow"] = 5] = "OnCollisionWindow";
        SpliteEvent[SpliteEvent["OnCollisionElements"] = 6] = "OnCollisionElements";
    })(Dennin.SpliteEvent || (Dennin.SpliteEvent = {}));
    var SpliteEvent = Dennin.SpliteEvent;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var PlayableSplite = (function (_super) {
        __extends(PlayableSplite, _super);
        function PlayableSplite() {
            _super.apply(this, arguments);
        }
        PlayableSplite.create = function (rect) {
            var playable = Dennin.Splite.create(rect);
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
    }(Dennin.Splite));
    Dennin.PlayableSplite = PlayableSplite;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var SpliteHelper = (function () {
        function SpliteHelper() {
        }
        SpliteHelper.prototype.collision = function (splite) {
            return this.collisionElements(this.collisionWindow(splite));
        };
        SpliteHelper.prototype.collisionWindow = function (splite) {
            var rect = splite.rect;
            var isCllision = false;
            if (rect.position.x < 0) {
                rect.position.x = 0;
                isCllision = true;
            }
            if (rect.position.x + rect.size.width > window.innerWidth) {
                rect.position.x = window.innerWidth - rect.size.width;
                isCllision = true;
            }
            splite.rect = rect;
            if (isCllision) {
                splite.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnCollisionWindow]);
            }
            return splite;
        };
        SpliteHelper.prototype.collisionElements = function (splite) {
            return null;
        };
        return SpliteHelper;
    }());
    Dennin.SpliteHelper = SpliteHelper;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var Splite = (function () {
        function Splite(element) {
            this.element = element;
            this.helper = new Dennin.SpliteHelper();
        }
        Splite.create = function (rect) {
            var element = document.createElement('splite');
            var splite = new Splite(element);
            splite.rect = rect;
            return splite;
        };
        Splite.prototype.on = function (eventName, f) { };
        Splite.prototype.off = function (eventName) { };
        Splite.prototype.dispatch = function (eventName) { };
        Splite.prototype.run = function () { };
        Splite.prototype.update = function () { };
        Splite.prototype.kill = function () { };
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
})(Dennin || (Dennin = {}));
