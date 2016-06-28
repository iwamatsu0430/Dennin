var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dennin;
(function (Dennin) {
    var Config = (function () {
        function Config() {
        }
        Config.NodeName = 'DENNIN-SPLITE';
        Config.classNames = {
            spliteBase: 'dennin-splite-base'
        };
        return Config;
    }());
    Dennin.Config = Config;
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
    var domController;
    function init() {
        if (domController === undefined) {
            domController = new Dennin.DOMController();
        }
        var style = document.createElement('style');
        style.innerHTML = "\n      ." + Dennin.Config.classNames.spliteBase + " {\n        position: fixed;\n        background-color: red; // FIXME: temp style for debug\n      }\n    ";
        document.getElementsByTagName('head')[0].appendChild(style);
        document.addEventListener('keydown', function (e) {
            domController.bodyDoms.forEach(function (dom) {
                if (dom.nodeName !== Dennin.Config.NodeName) {
                    return;
                }
                dom.dispatchEvent(new CustomEvent(Dennin.SpliteEvent[Dennin.SpliteEvent.OnKeyDown], { detail: e.keyCode }));
            });
        });
        document.addEventListener('keyup', function (e) {
            domController.bodyDoms.forEach(function (dom) {
                if (dom.nodeName !== Dennin.Config.NodeName) {
                    return;
                }
                dom.dispatchEvent(new CustomEvent(Dennin.SpliteEvent[Dennin.SpliteEvent.OnKeyUp], { detail: e.keyCode }));
            });
        });
    }
    Dennin.init = init;
    function loadDOMs() {
        domController.reload();
    }
    Dennin.loadDOMs = loadDOMs;
    function create(rect) {
        if (rect === void 0) { rect = { position: { x: 0, y: 0 }, size: { width: 32, height: 32 } }; }
        var splite = Dennin.PlayableSplite.create(rect);
        domController.add(splite.element);
        return splite;
    }
    Dennin.create = create;
    function getDoms() {
        return domController.bodyDoms;
    }
    Dennin.getDoms = getDoms;
    function bookmarklet() {
        loadDOMs();
        create();
    }
    Dennin.bookmarklet = bookmarklet;
})(Dennin || (Dennin = {}));
Dennin.init();
var Dennin;
(function (Dennin) {
    (function (SpliteEvent) {
        SpliteEvent[SpliteEvent["OnKeyDown"] = 0] = "OnKeyDown";
        SpliteEvent[SpliteEvent["OnKeyUp"] = 1] = "OnKeyUp";
        SpliteEvent[SpliteEvent["OnGoLeft"] = 2] = "OnGoLeft";
        SpliteEvent[SpliteEvent["OnGoRight"] = 3] = "OnGoRight";
        SpliteEvent[SpliteEvent["OnDoJump"] = 4] = "OnDoJump";
        SpliteEvent[SpliteEvent["OnDoFall"] = 5] = "OnDoFall";
        SpliteEvent[SpliteEvent["OnDoAttack"] = 6] = "OnDoAttack";
        SpliteEvent[SpliteEvent["OnStopLeft"] = 7] = "OnStopLeft";
        SpliteEvent[SpliteEvent["OnStopRight"] = 8] = "OnStopRight";
        SpliteEvent[SpliteEvent["OnStopJump"] = 9] = "OnStopJump";
        SpliteEvent[SpliteEvent["OnCollisionWindow"] = 10] = "OnCollisionWindow";
        SpliteEvent[SpliteEvent["OnCollisionElements"] = 11] = "OnCollisionElements";
    })(Dennin.SpliteEvent || (Dennin.SpliteEvent = {}));
    var SpliteEvent = Dennin.SpliteEvent;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var Splite = (function () {
        function Splite(rect) {
            this.element = document.createElement(Dennin.Config.NodeName);
            this.helper = new Dennin.SpliteHelper();
            this.rect = rect;
            this.initStyle();
            document.getElementsByTagName('body')[0].appendChild(this.element);
        }
        Splite.create = function (rect) {
            return new Splite(rect);
        };
        Splite.prototype.initStyle = function () {
            this.element.classList.add(Dennin.Config.classNames.spliteBase);
            this.element.style.left = this.rect.position.x + "px";
            this.element.style.top = this.rect.position.y + "px";
            this.element.style.width = this.rect.size.width + "px";
            this.element.style.height = this.rect.size.height + "px";
        };
        Splite.prototype.on = function (eventName, f) {
            this.element.addEventListener(eventName, f);
            return this;
        };
        Splite.prototype.off = function (eventName, f) {
            this.element.removeEventListener(eventName, f);
            return this;
        };
        Splite.prototype.dispatch = function (eventName, option) {
            var e = new CustomEvent(eventName, {
                detail: option
            });
            this.element.dispatchEvent(e);
            return this;
        };
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
var Dennin;
(function (Dennin) {
    var PlayableSplite = (function (_super) {
        __extends(PlayableSplite, _super);
        function PlayableSplite() {
            _super.apply(this, arguments);
        }
        PlayableSplite.create = function (rect) {
            var playable = new PlayableSplite(rect);
            playable.on(Dennin.SpliteEvent[Dennin.SpliteEvent.OnKeyDown], function (e) {
                if (playable.keyConfig === null || playable.keyConfig === undefined) {
                    return;
                }
                var keyCode = e.detail;
                if (keyCode === playable.keyConfig.goLeft) {
                    playable.goLeft();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnGoLeft]);
                }
                else if (keyCode === playable.keyConfig.goRight) {
                    playable.goRight();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnGoRight]);
                }
                else if (keyCode === playable.keyConfig.doJump) {
                    playable.doJump();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnDoJump]);
                }
                else if (keyCode === playable.keyConfig.doFall) {
                    playable.doFall();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnDoFall]);
                }
                else if (keyCode === playable.keyConfig.doAttack) {
                    playable.doAttack();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnDoAttack]);
                }
            });
            playable.on(Dennin.SpliteEvent[Dennin.SpliteEvent.OnKeyUp], function (e) {
                if (playable.keyConfig === null || playable.keyConfig === undefined) {
                    return;
                }
                var keyCode = e.detail;
                if (keyCode === playable.keyConfig.goLeft) {
                    playable.stopLeft();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnStopLeft]);
                }
                else if (keyCode === playable.keyConfig.goRight) {
                    playable.stopRight();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnStopRight]);
                }
                else if (keyCode === playable.keyConfig.doJump) {
                    playable.stopJump();
                    playable.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnStopJump]);
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
            this.collisionWindow(splite);
            this.collisionElements(splite);
        };
        SpliteHelper.prototype.collisionWindow = function (splite) {
            var rect = splite.rect;
            var isCollided = false;
            if (rect.position.x < 0) {
                rect.position.x = 0;
                isCollided = true;
            }
            if (rect.position.x + rect.size.width > window.innerWidth) {
                rect.position.x = window.innerWidth - rect.size.width;
                isCollided = true;
            }
            splite.rect = rect;
            if (isCollided) {
                splite.dispatch(Dennin.SpliteEvent[Dennin.SpliteEvent.OnCollisionWindow]);
            }
        };
        SpliteHelper.prototype.collisionElements = function (splite) {
            return null;
        };
        return SpliteHelper;
    }());
    Dennin.SpliteHelper = SpliteHelper;
})(Dennin || (Dennin = {}));
