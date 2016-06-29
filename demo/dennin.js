var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dennin;
(function (Dennin) {
    var Config = (function () {
        function Config() {
            this.nodeName = 'DENNIN-SPLITE';
            this.defaultKeyConfig = {
                goLeft: 37,
                goRight: 39,
                doJump: 38,
                doFall: 40,
                doAttack: 65
            };
        }
        return Config;
    }());
    Dennin.Config = Config;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var EnumDef = (function () {
        function EnumDef(code) {
            this.code = code;
        }
        return EnumDef;
    }());
    var EnumBase = (function () {
        function EnumBase() {
            var _this = this;
            this.valueOf = function (code) {
                var filtered = _this.values.filter(function (value) { return value.code === code; });
                return filtered.length > 0 ? filtered[0] : null;
            };
        }
        return EnumBase;
    }());
    var Enums = (function () {
        function Enums() {
            this.SpliteEvent = new SpliteEvent();
        }
        return Enums;
    }());
    Dennin.Enums = Enums;
    var SpliteEventDef = (function (_super) {
        __extends(SpliteEventDef, _super);
        function SpliteEventDef() {
            _super.apply(this, arguments);
        }
        return SpliteEventDef;
    }(EnumDef));
    var SpliteEvent = (function (_super) {
        __extends(SpliteEvent, _super);
        function SpliteEvent() {
            _super.apply(this, arguments);
            this.OnKeyDown = new SpliteEventDef('OnKeyDown');
            this.OnKeyUp = new SpliteEventDef('OnKeyUp');
            this.OnGoLeft = new SpliteEventDef('OnGoLeft');
            this.OnGoRight = new SpliteEventDef('OnGoRight');
            this.OnDoJump = new SpliteEventDef('OnDoJump');
            this.OnDoFall = new SpliteEventDef('OnDoFall');
            this.OnDoAttack = new SpliteEventDef('OnDoAttack');
            this.OnStopLeft = new SpliteEventDef('OnStopLeft');
            this.OnStopRight = new SpliteEventDef('OnStopRight');
            this.OnStopJump = new SpliteEventDef('OnStopJump');
            this.OnCollisionWindow = new SpliteEventDef('OnCollisionWindow');
            this.OnCollisionElements = new SpliteEventDef('OnCollisionElements');
            this.values = [this.OnKeyDown, this.OnKeyUp, this.OnGoLeft, this.OnGoRight, this.OnDoJump, this.OnDoFall, this.OnDoAttack, this.OnStopLeft, this.OnStopRight, this.OnStopJump, this.OnCollisionWindow, this.OnCollisionElements];
        }
        return SpliteEvent;
    }(EnumBase));
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var Environment = (function () {
        function Environment() {
            this.setupStyle();
            this.addGlobalKeyEvent();
        }
        Environment.prototype.setupStyle = function () {
            var style = document.createElement('style');
            style.innerHTML = "\n        " + Dennin.config.nodeName + " {\n          position: fixed;\n          background-color: red; // FIXME: temp style for debug\n        }\n      ";
            document.getElementsByTagName('head')[0].appendChild(style);
        };
        Environment.prototype.addGlobalKeyEvent = function () {
            var _this = this;
            document.addEventListener('keydown', function (e) {
                _this.bodyDoms.forEach(function (dom) {
                    if (dom.nodeName !== Dennin.config.nodeName) {
                        return;
                    }
                    dom.dispatchEvent(new CustomEvent(Dennin.enums.SpliteEvent.OnKeyDown.code, { detail: e.keyCode }));
                });
            });
            document.addEventListener('keyup', function (e) {
                _this.bodyDoms.forEach(function (dom) {
                    if (dom.nodeName !== Dennin.config.nodeName) {
                        return;
                    }
                    dom.dispatchEvent(new CustomEvent(Dennin.enums.SpliteEvent.OnKeyUp.code, { detail: e.keyCode }));
                });
            });
        };
        Environment.prototype.reload = function () {
            var doms = document.querySelectorAll("body *");
            this.bodyDoms = Array.prototype.slice.call(doms);
        };
        Environment.prototype.add = function (dom) {
            this.bodyDoms.push(dom);
        };
        Environment.prototype.remove = function (dom) {
            var index = this.bodyDoms.indexOf(dom);
            if (index >= 0) {
                this.bodyDoms.splice(index, 1);
            }
        };
        return Environment;
    }());
    Dennin.Environment = Environment;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var environment;
    function init() {
        if (Dennin.config === undefined) {
            Dennin.config = new Dennin.Config();
        }
        if (Dennin.enums === undefined) {
            Dennin.enums = new Dennin.Enums();
        }
        if (environment === undefined) {
            environment = new Dennin.Environment();
        }
    }
    Dennin.init = init;
    function loadDOMs() {
        environment.reload();
    }
    Dennin.loadDOMs = loadDOMs;
    function create(rect) {
        if (rect === void 0) { rect = { position: { x: 0, y: 0 }, size: { width: 32, height: 32 } }; }
        var splite = Dennin.PlayableSplite.create(rect);
        environment.add(splite.element);
        return splite;
    }
    Dennin.create = create;
    function getDoms() {
        return environment.bodyDoms;
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
    var Splite = (function () {
        function Splite(rect) {
            this.element = document.createElement(Dennin.config.nodeName);
            this.helper = new Dennin.SpliteHelper();
            this.rect = rect;
            this.initStyle();
            document.getElementsByTagName('body')[0].appendChild(this.element);
        }
        Splite.create = function (rect) {
            return new Splite(rect);
        };
        Splite.prototype.initStyle = function () {
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
            playable.on(Dennin.enums.SpliteEvent.OnKeyDown.code, function (e) {
                if (playable.keyConfig === null || playable.keyConfig === undefined) {
                    return;
                }
                var keyCode = e.detail;
                if (keyCode === playable.keyConfig.goLeft) {
                    playable.goLeft();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnGoLeft.code);
                }
                else if (keyCode === playable.keyConfig.goRight) {
                    playable.goRight();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnGoRight.code);
                }
                else if (keyCode === playable.keyConfig.doJump) {
                    playable.doJump();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnDoJump.code);
                }
                else if (keyCode === playable.keyConfig.doFall) {
                    playable.doFall();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnDoFall.code);
                }
                else if (keyCode === playable.keyConfig.doAttack) {
                    playable.doAttack();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnDoAttack.code);
                }
            });
            playable.on(Dennin.enums.SpliteEvent.OnKeyUp.code, function (e) {
                if (playable.keyConfig === null || playable.keyConfig === undefined) {
                    return;
                }
                var keyCode = e.detail;
                if (keyCode === playable.keyConfig.goLeft) {
                    playable.stopLeft();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnStopLeft.code);
                }
                else if (keyCode === playable.keyConfig.goRight) {
                    playable.stopRight();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnStopRight.code);
                }
                else if (keyCode === playable.keyConfig.doJump) {
                    playable.stopJump();
                    playable.dispatch(Dennin.enums.SpliteEvent.OnStopJump.code);
                }
            });
            return playable;
        };
        PlayableSplite.prototype.setDefaultKeyConfig = function () {
            return this.setKeyConfig(Dennin.config.defaultKeyConfig);
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
                splite.dispatch(Dennin.enums.SpliteEvent.OnCollisionWindow.code);
            }
        };
        SpliteHelper.prototype.collisionElements = function (splite) {
            return null;
        };
        return SpliteHelper;
    }());
    Dennin.SpliteHelper = SpliteHelper;
})(Dennin || (Dennin = {}));
