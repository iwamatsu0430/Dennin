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
            this.fps = 60;
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
            this.isRunningClock = false;
            this.splites = [];
            this.bodyDoms = [];
            this.keyBuffers = [];
            this.setupStyle();
            this.addGlobalKeyEvent();
            this.startClock();
        }
        Environment.prototype.setupStyle = function () {
            var style = document.createElement('style');
            style.innerHTML = "\n        " + Dennin.config.nodeName + " {\n          position: fixed;\n          background-color: red; // FIXME: temp style for debug\n        }\n      ";
            document.getElementsByTagName('head')[0].appendChild(style);
        };
        Environment.prototype.addGlobalKeyEvent = function () {
            var _this = this;
            document.addEventListener('keydown', function (e) {
                var keyCode = e.keyCode;
                if (_this.keyBuffers.indexOf(keyCode) === -1) {
                    _this.keyBuffers.push(keyCode);
                }
            });
            document.addEventListener('keyup', function (e) {
                var keyCode = e.keyCode;
                var index = _this.keyBuffers.indexOf(keyCode);
                _this.keyBuffers.splice(index, 1);
                _this.splites.forEach(function (splite) {
                    splite.dispatch(Dennin.enums.SpliteEvent.OnKeyUp.code, keyCode);
                });
            });
        };
        Environment.prototype.startClock = function () {
            var _this = this;
            this.isRunningClock = true;
            var f = function () {
                _this.splites.forEach(function (splite) {
                    splite.dispatch(Dennin.enums.SpliteEvent.OnKeyDown.code, _this.keyBuffers.concat());
                    splite.run();
                });
                if (_this.isRunningClock) {
                    setTimeout(f, 1000 / Dennin.config.fps);
                }
            };
            f();
        };
        Environment.prototype.stopClock = function () {
            this.isRunningClock = false;
        };
        Environment.prototype.reload = function () {
            var doms = document.querySelectorAll("body *");
            this.bodyDoms = Array.prototype.slice.call(doms);
        };
        Environment.prototype.add = function (dom) {
            this.bodyDoms.push(dom);
        };
        Environment.prototype.addSplite = function (splite) {
            this.splites.push(splite);
            this.bodyDoms.push(splite.element);
            document.getElementsByTagName('body')[0].appendChild(splite.element);
        };
        Environment.prototype.remove = function (dom) {
            var index = this.bodyDoms.indexOf(dom);
            if (index >= 0) {
                this.bodyDoms.splice(index, 1);
            }
        };
        Environment.prototype.removeSplite = function (splite) {
            var index = this.splites.indexOf(splite);
            if (index >= 0) {
                splite.element.parentNode.removeChild(splite.element);
                this.splites.splice(index, 1);
                this.remove(splite.element);
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
    function createDennin(rect) {
        if (rect === void 0) { rect = { position: { x: 0, y: 0 }, size: { width: 32, height: 32 } }; }
        var splite = Dennin.SpliteDennin.create(rect);
        environment.addSplite(splite);
        return splite;
    }
    Dennin.createDennin = createDennin;
    function removeSplite(splite) {
        environment.removeSplite(splite);
    }
    Dennin.removeSplite = removeSplite;
    function getDoms() {
        return environment.bodyDoms;
    }
    Dennin.getDoms = getDoms;
    function bookmarklet() {
        loadDOMs();
        createDennin();
    }
    Dennin.bookmarklet = bookmarklet;
})(Dennin || (Dennin = {}));
Dennin.init();
var Dennin;
(function (Dennin) {
    var Splite = (function () {
        function Splite(rect) {
            this.accel = {
                x: 0,
                y: 0
            };
            this.status = {
                isMovingX: false,
                isLanding: false,
                isJumping: false,
                isFloating: true
            };
            this.element = document.createElement(Dennin.config.nodeName);
            this.rect = rect;
            this.setStyle();
        }
        Splite.create = function (rect) {
            return new Splite(rect);
        };
        Splite.prototype.setStyle = function () {
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
        Splite.prototype.kill = function () {
            Dennin.removeSplite(this);
        };
        Splite.prototype.run = function () {
            this.loop();
            this.update();
        };
        Splite.prototype.update = function () {
            this.setStyle();
        };
        Splite.prototype.collision = function () {
            this.collisionWindow();
            this.collisionElements();
        };
        Splite.prototype.collisionWindow = function () {
            var rect = this.rect;
            var isCollided = false;
            if (rect.position.x < 0) {
                rect.position.x = 0;
                isCollided = true;
            }
            if (rect.position.x + rect.size.width > window.innerWidth) {
                rect.position.x = window.innerWidth - rect.size.width;
                isCollided = true;
            }
            this.rect = rect;
            if (isCollided) {
                this.dispatch(Dennin.enums.SpliteEvent.OnCollisionWindow.code);
            }
        };
        Splite.prototype.collisionElements = function () {
            var _this = this;
            this.status.isFloating = true;
            var cllideX = Dennin.getDoms().filter(function (dom) {
                var collisionLX = _this.rect.position.x <= dom.offsetLeft + dom.offsetWidth;
                var collisionRX = _this.rect.position.x + _this.rect.size.width >= dom.offsetLeft;
                return collisionLX || collisionRX;
            });
        };
        Splite.prototype.loop = function () { };
        Splite.prototype.goLeft = function () { };
        Splite.prototype.goRight = function () { };
        Splite.prototype.doJump = function () { };
        Splite.prototype.doFall = function () { };
        Splite.prototype.doAttack = function () { };
        Splite.prototype.stopLeft = function () { };
        Splite.prototype.stopRight = function () { };
        Splite.prototype.stopJump = function () { };
        Splite.prototype.landing = function () { };
        Splite.prototype.floating = function () { };
        Splite.prototype.onOver = function () { };
        Splite.prototype.onMouseMove = function () { };
        return Splite;
    }());
    Dennin.Splite = Splite;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var SplitePlayable = (function (_super) {
        __extends(SplitePlayable, _super);
        function SplitePlayable(rect) {
            _super.call(this, rect);
            this.addKeyEvent();
        }
        SplitePlayable.create = function (rect) {
            return new SplitePlayable(rect);
        };
        SplitePlayable.prototype.addKeyEvent = function () {
            var _this = this;
            this.on(Dennin.enums.SpliteEvent.OnKeyDown.code, function (e) {
                if (_this.keyConfig === null || _this.keyConfig === undefined) {
                    return;
                }
                var keyBuffers = e.detail;
                var keyCode = keyBuffers[keyBuffers.length - 1];
                if (keyCode === _this.keyConfig.goLeft) {
                    _this.goLeft();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnGoLeft.code);
                }
                else if (keyCode === _this.keyConfig.goRight) {
                    _this.goRight();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnGoRight.code);
                }
                else if (keyCode === _this.keyConfig.doJump) {
                    _this.doJump();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnDoJump.code);
                }
                else if (keyCode === _this.keyConfig.doFall) {
                    _this.doFall();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnDoFall.code);
                }
                else if (keyCode === _this.keyConfig.doAttack) {
                    _this.doAttack();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnDoAttack.code);
                }
            });
            this.on(Dennin.enums.SpliteEvent.OnKeyUp.code, function (e) {
                if (_this.keyConfig === null || _this.keyConfig === undefined) {
                    return;
                }
                var keyCode = e.detail;
                if (keyCode === _this.keyConfig.goLeft) {
                    _this.stopLeft();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnStopLeft.code);
                }
                else if (keyCode === _this.keyConfig.goRight) {
                    _this.stopRight();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnStopRight.code);
                }
                else if (keyCode === _this.keyConfig.doJump) {
                    _this.stopJump();
                    _this.dispatch(Dennin.enums.SpliteEvent.OnStopJump.code);
                }
            });
        };
        SplitePlayable.prototype.setDefaultKeyConfig = function () {
            return this.setKeyConfig(Dennin.config.defaultKeyConfig);
        };
        SplitePlayable.prototype.setKeyConfig = function (newKeyConfig) {
            this.keyConfig = newKeyConfig;
            return this;
        };
        return SplitePlayable;
    }(Dennin.Splite));
    Dennin.SplitePlayable = SplitePlayable;
})(Dennin || (Dennin = {}));
var Dennin;
(function (Dennin) {
    var SpliteDennin = (function (_super) {
        __extends(SpliteDennin, _super);
        function SpliteDennin() {
            _super.apply(this, arguments);
            this.direction = false;
            this.jumpCount = 0;
        }
        SpliteDennin.create = function (rect) {
            return new SpliteDennin(rect);
        };
        SpliteDennin.prototype.loop = function () {
            this.collision();
            this.rect.position.x += this.accel.x;
            this.rect.position.y += this.accel.y;
            this.moveY();
            this.moveX();
        };
        SpliteDennin.prototype.moveY = function () {
        };
        SpliteDennin.prototype.moveX = function () {
            if (!this.status.isMovingX && this.accel.x * this.accel.x >= 1) {
                var counter = this.direction ? -1 : 1;
                this.accel.x += counter;
                if (this.accel.x * this.accel.x <= 1) {
                    this.accel.x = 0;
                }
            }
        };
        SpliteDennin.prototype.goLeft = function () {
            if (this.accel.x > 0 && this.direction) {
                this.accel.x *= -0.8;
            }
            this.accel.x += -1 * ((this.accel.x === 0) ? 2 : 0.5);
            if (this.accel.x < -15) {
                this.accel.x = -15;
            }
            this.direction = false;
            this.status.isMovingX = true;
        };
        SpliteDennin.prototype.goRight = function () {
            if (this.accel.x < 0 && !this.direction) {
                this.accel.x *= -0.8;
            }
            this.accel.x += (this.accel.x === 0) ? 2 : 0.5;
            if (this.accel.x > 15) {
                this.accel.x = 15;
            }
            this.direction = true;
            this.status.isMovingX = true;
        };
        SpliteDennin.prototype.doJump = function () {
        };
        SpliteDennin.prototype.doFall = function () { };
        SpliteDennin.prototype.doAttack = function () { };
        SpliteDennin.prototype.stopLeft = function () {
            this.status.isMovingX = false;
        };
        SpliteDennin.prototype.stopRight = function () {
            this.status.isMovingX = false;
        };
        SpliteDennin.prototype.stopJump = function () { };
        SpliteDennin.prototype.landing = function () { };
        SpliteDennin.prototype.floating = function () { };
        SpliteDennin.prototype.onOver = function () { };
        SpliteDennin.prototype.onMouseMove = function () { };
        return SpliteDennin;
    }(Dennin.SplitePlayable));
    Dennin.SpliteDennin = SpliteDennin;
})(Dennin || (Dennin = {}));
