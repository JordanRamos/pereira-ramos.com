(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
IMap.prototype = {
	__class__: IMap
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var com = {};
com.isartdigital = {};
com.isartdigital.Main = function() {
	PIXI.EventTarget.call(this);
	this.stage = new PIXI.Stage(8306926);
	this.renderer = PIXI.autoDetectRenderer((function($this) {
		var $r;
		var this1 = com.isartdigital.utils.system.DeviceCapabilities.get_width();
		var $int = this1;
		$r = $int < 0?4294967296.0 + $int:$int + 0.0;
		return $r;
	}(this)),(function($this) {
		var $r;
		var this2 = com.isartdigital.utils.system.DeviceCapabilities.get_height();
		var int1 = this2;
		$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
		return $r;
	}(this)));
	window.document.body.appendChild(this.renderer.view);
	var lConfig = new PIXI.JsonLoader("config.json");
	lConfig.addEventListener("loaded",$bind(this,this.preloadAssets));
	lConfig.load();
};
com.isartdigital.Main.__name__ = ["com","isartdigital","Main"];
com.isartdigital.Main.main = function() {
	com.isartdigital.Main.getInstance();
};
com.isartdigital.Main.getInstance = function() {
	if(com.isartdigital.Main.instance == null) com.isartdigital.Main.instance = new com.isartdigital.Main();
	return com.isartdigital.Main.instance;
};
com.isartdigital.Main.__super__ = PIXI.EventTarget;
com.isartdigital.Main.prototype = $extend(PIXI.EventTarget.prototype,{
	preloadAssets: function(pEvent) {
		pEvent.target.removeEventListener("loaded",$bind(this,this.preloadAssets));
		com.isartdigital.utils.Config.init((js.Boot.__cast(pEvent.target , PIXI.JsonLoader)).json);
		if(com.isartdigital.utils.Config.get_debug()) com.isartdigital.utils.Debug.getInstance().init(this);
		if(com.isartdigital.utils.Config.get_data().boxAlpha != null) com.isartdigital.utils.game.StateGraphic.boxAlpha = com.isartdigital.utils.Config.get_data().boxAlpha;
		if(com.isartdigital.utils.Config.get_data().animAlpha != null) com.isartdigital.utils.game.StateGraphic.animAlpha = com.isartdigital.utils.Config.get_data().animAlpha;
		com.isartdigital.utils.game.GameStage.getInstance().set_scaleMode(com.isartdigital.utils.game.GameStageScale.SHOW_ALL);
		com.isartdigital.utils.game.GameStage.getInstance().init($bind(this,this.render),2048,1366);
		com.isartdigital.utils.system.DeviceCapabilities.displayFullScreenButton();
		this.stage.addChild(com.isartdigital.utils.game.GameStage.getInstance());
		window.addEventListener("resize",$bind(this,this.resize));
		this.resize();
		var lLoader = new com.isartdigital.utils.loader.Loader();
		lLoader.addAssetFile("black_bg.png");
		lLoader.addAssetFile("preload.png");
		lLoader.addAssetFile("preload_bg.png");
		lLoader.addEventListener("LoaderEvent.COMPLETE",$bind(this,this.loadAssets));
		lLoader.load();
	}
	,loadAssets: function(pEvent) {
		pEvent.target.removeEventListener("LoaderEvent.COMPLETE",$bind(this,this.loadAssets));
		var lLoader = new com.isartdigital.utils.loader.Loader();
		lLoader.addTxtFile("boxes.json");
		lLoader.addSoundFile("sounds.json");
		lLoader.addAssetFile("alpha_bg.png");
		lLoader.addAssetFile("Intro_bg.png");
		lLoader.addAssetFile("TitleCard_bg.png");
		lLoader.addAssetFile("Pause.png");
		lLoader.addAssetFile("Buttons.json");
		lLoader.addAssetFile("LevelSelect.json");
		lLoader.addAssetFile("Characters_graphics.json");
		lLoader.addAssetFile("btnLeft.png");
		lLoader.addAssetFile("btnRight.png");
		lLoader.addAssetFile("btnJump.png");
		lLoader.addAssetFile("btnShoot.png");
		lLoader.addAssetFile("Popup.png");
		lLoader.addEventListener("LoaderEvent.PROGRESS",$bind(this,this.onLoadProgress));
		lLoader.addEventListener("LoaderEvent.COMPLETE",$bind(this,this.onLoadComplete));
		com.isartdigital.ui.UIManager.getInstance().openScreen(com.isartdigital.ui.GraphicLoader.getInstance());
		window.requestAnimationFrame($bind(this,this.gameLoop));
		lLoader.load();
	}
	,onLoadProgress: function(pEvent) {
		com.isartdigital.ui.GraphicLoader.getInstance().update(pEvent.data.loaded / pEvent.data.total);
	}
	,onLoadComplete: function(pEvent) {
		pEvent.target.removeEventListener("LoaderEvent.PROGRESS",$bind(this,this.onLoadProgress));
		pEvent.target.removeEventListener("LoaderEvent.COMPLETE",$bind(this,this.onLoadComplete));
		com.isartdigital.utils.game.StateGraphic.addTextures(com.isartdigital.utils.loader.Loader.getContent("Characters_graphics.json"));
		com.isartdigital.utils.game.StateGraphic.addBoxes(com.isartdigital.utils.loader.Loader.getContent("boxes.json"));
		com.isartdigital.utils.game.StateGraphic.addTextures(com.isartdigital.utils.loader.Loader.getContent("Buttons.json"));
		com.isartdigital.utils.game.StateGraphic.addTextures(com.isartdigital.utils.loader.Loader.getContent("LevelSelect.json"));
		com.isartdigital.utils.game.StateGraphic.addTextures(com.isartdigital.utils.loader.Loader.getContent("Popup.png"));
		com.isartdigital.ui.UIManager.getInstance().openScreen(com.isartdigital.ui.screens.Intro.getInstance());
	}
	,gameLoop: function() {
		window.requestAnimationFrame($bind(this,this.gameLoop));
		this.render();
		this.dispatchEvent("GameEvent.GAME_LOOP");
	}
	,resize: function(pEvent) {
		this.renderer.resize((function($this) {
			var $r;
			var this1 = com.isartdigital.utils.system.DeviceCapabilities.get_width();
			var $int = this1;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)),(function($this) {
			var $r;
			var this2 = com.isartdigital.utils.system.DeviceCapabilities.get_height();
			var int1 = this2;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this)));
		com.isartdigital.utils.game.GameStage.getInstance().resize();
	}
	,render: function() {
		this.renderer.render(this.stage);
	}
	,destroy: function() {
		window.removeEventListener("resize",$bind(this,this.resize));
		com.isartdigital.Main.instance = null;
	}
	,__class__: com.isartdigital.Main
});
com.isartdigital.game = {};
com.isartdigital.game.GameManager = function() {
	this.collectedCollectableForShield = 0;
	this.maxLevelCollectables = new Array();
	this.levelCollectables = new Array();
	this.spawnPoint = new PIXI.Point(0,0);
	this.isPaused = false;
	com.isartdigital.utils.ui.Keyboard.getInstance();
};
com.isartdigital.game.GameManager.__name__ = ["com","isartdigital","game","GameManager"];
com.isartdigital.game.GameManager.getInstance = function() {
	if(com.isartdigital.game.GameManager.instance == null) com.isartdigital.game.GameManager.instance = new com.isartdigital.game.GameManager();
	return com.isartdigital.game.GameManager.instance;
};
com.isartdigital.game.GameManager.prototype = {
	start: function() {
		com.isartdigital.ui.UIManager.getInstance().startGame();
		com.isartdigital.Main.getInstance().addEventListener("GameEvent.GAME_LOOP",$bind(this,this.gameLoop));
		this.background1 = new com.isartdigital.game.HorizontalScrollingPlane("background1",0.1,0.1);
		this.background2 = new com.isartdigital.game.HorizontalScrollingPlane("background2",0.2,0.2);
		com.isartdigital.utils.game.GameStage.getInstance().getGameContainer().addChild(this.background1);
		com.isartdigital.utils.game.GameStage.getInstance().getGameContainer().addChild(this.background2);
		com.isartdigital.utils.game.GameStage.getInstance().getGameContainer().addChild(com.isartdigital.game.GamePlane.getInstance());
		com.isartdigital.game.sprites.Player.getInstance().start();
		com.isartdigital.game.sprites.Player.getInstance().flipRight();
		com.isartdigital.ui.CheatPanel.getInstance().ingame();
		com.isartdigital.utils.game.Camera.getInstance().resetX();
		com.isartdigital.utils.game.Camera.getInstance().resetY();
		com.isartdigital.utils.game.Camera.getInstance().setTarget(com.isartdigital.game.GamePlane.getInstance());
		com.isartdigital.utils.game.Camera.getInstance().setFocus(com.isartdigital.game.sprites.Player.getInstance().cameraPoint());
		com.isartdigital.utils.game.Camera.getInstance().setPosition();
	}
	,gameLoop: function() {
		var _g1 = 0;
		var _g = com.isartdigital.game.sprites.shoots.Shoot.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.game.sprites.shoots.Shoot.list[i] == null) continue;
			com.isartdigital.game.sprites.shoots.Shoot.list[i].doAction();
		}
		var _g11 = 0;
		var _g2 = com.isartdigital.game.sprites.enemies.Enemy.list.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(com.isartdigital.game.sprites.enemies.Enemy.list[i1] == null) continue;
			com.isartdigital.game.sprites.enemies.Enemy.list[i1].doAction();
		}
		var _g12 = 0;
		var _g3 = com.isartdigital.game.level.KillZone.list.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			if(com.isartdigital.game.level.KillZone.list[i2] == null) continue;
			com.isartdigital.game.level.KillZone.list[i2].doAction();
		}
		var _g13 = 0;
		var _g4 = com.isartdigital.game.level.Collectable.list.length;
		while(_g13 < _g4) {
			var i3 = _g13++;
			if(com.isartdigital.game.level.Collectable.list[i3] == null) continue;
			com.isartdigital.game.level.Collectable.list[i3].doAction();
		}
		com.isartdigital.game.sprites.Player.getInstance().doAction();
		com.isartdigital.utils.game.Camera.getInstance().move();
		this.background1.doAction();
		this.background2.doAction();
		this.background2.y += 300;
		var objPosition;
		var _g14 = 0;
		var _g5 = com.isartdigital.game.level.Wall.list.length;
		while(_g14 < _g5) {
			var i4 = _g14++;
			objPosition = com.isartdigital.game.level.Wall.list[i4].position;
			objPosition = com.isartdigital.game.GamePlane.getInstance().toGlobal(objPosition);
			if(objPosition.x - com.isartdigital.game.level.Wall.list[i4].width < com.isartdigital.Main.getInstance().renderer.width && objPosition.x + com.isartdigital.game.level.Wall.list[i4].width > 0) {
				if(objPosition.y - com.isartdigital.game.level.Wall.list[i4].height < com.isartdigital.Main.getInstance().renderer.height && objPosition.y + com.isartdigital.game.level.Wall.list[i4].height > 0) {
					com.isartdigital.game.level.Wall.list[i4].visible = true;
					continue;
				}
			}
			com.isartdigital.game.level.Wall.list[i4].visible = false;
		}
		var _g15 = 0;
		var _g6 = com.isartdigital.game.level.Platform.list.length;
		while(_g15 < _g6) {
			var i5 = _g15++;
			objPosition = com.isartdigital.game.level.Platform.list[i5].position;
			objPosition = com.isartdigital.game.GamePlane.getInstance().toGlobal(objPosition);
			if(objPosition.x - com.isartdigital.game.level.Platform.list[i5].width < com.isartdigital.Main.getInstance().renderer.width && objPosition.x + com.isartdigital.game.level.Platform.list[i5].width > 0) {
				if(objPosition.y - com.isartdigital.game.level.Platform.list[i5].height < com.isartdigital.Main.getInstance().renderer.height && objPosition.y + com.isartdigital.game.level.Platform.list[i5].height > 0) {
					com.isartdigital.game.level.Platform.list[i5].visible = true;
					continue;
				}
			}
			com.isartdigital.game.level.Platform.list[i5].visible = false;
		}
		var _g16 = 0;
		var _g7 = com.isartdigital.game.level.Destructible.list.length;
		while(_g16 < _g7) {
			var i6 = _g16++;
			objPosition = com.isartdigital.game.level.Destructible.list[i6].position;
			objPosition = com.isartdigital.game.GamePlane.getInstance().toGlobal(objPosition);
			if(objPosition.x - com.isartdigital.game.level.Destructible.list[i6].width < com.isartdigital.Main.getInstance().renderer.width && objPosition.x + com.isartdigital.game.level.Destructible.list[i6].width > 0) {
				if(objPosition.y - com.isartdigital.game.level.Destructible.list[i6].height < com.isartdigital.Main.getInstance().renderer.height && objPosition.y + com.isartdigital.game.level.Destructible.list[i6].height > 0) {
					com.isartdigital.game.level.Destructible.list[i6].visible = true;
					continue;
				}
			}
			com.isartdigital.game.level.Destructible.list[i6].visible = false;
		}
		var _g17 = 0;
		var _g8 = com.isartdigital.game.level.KillZone.list.length;
		while(_g17 < _g8) {
			var i7 = _g17++;
			if(!com.isartdigital.game.level.KillZone.list[i7].isStatic) continue;
			objPosition = com.isartdigital.game.level.KillZone.list[i7].position;
			objPosition = com.isartdigital.game.GamePlane.getInstance().toGlobal(objPosition);
			if(objPosition.x - com.isartdigital.game.level.KillZone.list[i7].width < com.isartdigital.Main.getInstance().renderer.width && objPosition.x + com.isartdigital.game.level.KillZone.list[i7].width > 0) {
				if(objPosition.y - com.isartdigital.game.level.KillZone.list[i7].height < com.isartdigital.Main.getInstance().renderer.height && objPosition.y + com.isartdigital.game.level.KillZone.list[i7].height > 0) {
					com.isartdigital.game.level.KillZone.list[i7].visible = true;
					continue;
				}
			}
			com.isartdigital.game.level.KillZone.list[i7].visible = false;
		}
		var _g18 = 0;
		var _g9 = com.isartdigital.game.sprites.CheckPoint.list.length;
		while(_g18 < _g9) {
			var i8 = _g18++;
			objPosition = com.isartdigital.game.sprites.CheckPoint.list[i8].position;
			objPosition = com.isartdigital.game.GamePlane.getInstance().toGlobal(objPosition);
			if(objPosition.x - com.isartdigital.game.sprites.CheckPoint.list[i8].width < com.isartdigital.Main.getInstance().renderer.width && objPosition.x + com.isartdigital.game.sprites.CheckPoint.list[i8].width > 0) {
				if(objPosition.y - com.isartdigital.game.sprites.CheckPoint.list[i8].height < com.isartdigital.Main.getInstance().renderer.height && objPosition.y + com.isartdigital.game.sprites.CheckPoint.list[i8].height > 0) {
					com.isartdigital.game.sprites.CheckPoint.list[i8].visible = true;
					continue;
				}
			}
			com.isartdigital.game.sprites.CheckPoint.list[i8].visible = false;
		}
	}
	,destroy: function() {
		com.isartdigital.Main.getInstance().removeEventListener("GameEvent.GAME_LOOP",$bind(this,this.gameLoop));
		com.isartdigital.game.GameManager.instance = null;
	}
	,pause: function() {
		this.isPaused = !this.isPaused;
		if(this.isPaused) com.isartdigital.Main.getInstance().addEventListener("GameEvent.GAME_LOOP",$bind(this,this.gameLoop)); else com.isartdigital.Main.getInstance().removeEventListener("GameEvent.GAME_LOOP",$bind(this,this.gameLoop));
		return this.isPaused;
	}
	,respawnPlayer: function() {
		com.isartdigital.game.sprites.Player.getInstance().flipRight();
		com.isartdigital.game.sprites.Player.getInstance().start();
		com.isartdigital.utils.game.Camera.getInstance().setFocus(com.isartdigital.game.sprites.Player.getInstance().cameraPoint());
		com.isartdigital.game.sprites.Player.getInstance().position.set(this.spawnPoint.x,this.spawnPoint.y);
		com.isartdigital.utils.game.Camera.getInstance().setPosition();
		this.background1.replace();
		this.background2.replace();
	}
	,__class__: com.isartdigital.game.GameManager
};
var pixi = {};
pixi.display = {};
pixi.display.DisplayObject = function() {
	PIXI.DisplayObject.call(this);
	this.name = "";
};
pixi.display.DisplayObject.__name__ = ["pixi","display","DisplayObject"];
pixi.display.DisplayObject.__super__ = PIXI.DisplayObject;
pixi.display.DisplayObject.prototype = $extend(PIXI.DisplayObject.prototype,{
	__class__: pixi.display.DisplayObject
});
pixi.display.DisplayObjectContainer = function() {
	PIXI.DisplayObjectContainer.call(this);
};
pixi.display.DisplayObjectContainer.__name__ = ["pixi","display","DisplayObjectContainer"];
pixi.display.DisplayObjectContainer.__super__ = PIXI.DisplayObjectContainer;
pixi.display.DisplayObjectContainer.prototype = $extend(PIXI.DisplayObjectContainer.prototype,{
	getChildByName: function(name) {
		var _g1 = 0;
		var _g = this.children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.children[i].name == name) return this.children[i];
		}
		return null;
	}
	,applyScale: function(pixelRatio) {
		if(pixelRatio > 0) this.scale.set(1 / pixelRatio,1 / pixelRatio);
	}
	,__class__: pixi.display.DisplayObjectContainer
});
com.isartdigital.utils = {};
com.isartdigital.utils.game = {};
com.isartdigital.utils.game.GameObject = function() {
	pixi.display.DisplayObjectContainer.call(this);
	this.setModeVoid();
};
com.isartdigital.utils.game.GameObject.__name__ = ["com","isartdigital","utils","game","GameObject"];
com.isartdigital.utils.game.GameObject.__super__ = pixi.display.DisplayObjectContainer;
com.isartdigital.utils.game.GameObject.prototype = $extend(pixi.display.DisplayObjectContainer.prototype,{
	setModeVoid: function() {
		this.doAction = $bind(this,this.doActionVoid);
	}
	,doActionVoid: function() {
	}
	,setModeNormal: function() {
		this.doAction = $bind(this,this.doActionNormal);
	}
	,doActionNormal: function() {
	}
	,start: function() {
		this.setModeNormal();
	}
	,destroy: function() {
		this.setModeVoid();
	}
	,__class__: com.isartdigital.utils.game.GameObject
});
com.isartdigital.game.GamePlane = function() {
	com.isartdigital.utils.game.GameObject.call(this);
	this.start();
};
com.isartdigital.game.GamePlane.__name__ = ["com","isartdigital","game","GamePlane"];
com.isartdigital.game.GamePlane.getInstance = function() {
	if(com.isartdigital.game.GamePlane.instance == null) com.isartdigital.game.GamePlane.instance = new com.isartdigital.game.GamePlane();
	return com.isartdigital.game.GamePlane.instance;
};
com.isartdigital.game.GamePlane.__super__ = com.isartdigital.utils.game.GameObject;
com.isartdigital.game.GamePlane.prototype = $extend(com.isartdigital.utils.game.GameObject.prototype,{
	destroy: function() {
		com.isartdigital.game.GamePlane.instance = null;
	}
	,__class__: com.isartdigital.game.GamePlane
});
com.isartdigital.game.HorizontalScrollingPlane = function(pAssetName,scalePosX,scalePosY) {
	this.planes = new Array();
	pixi.display.DisplayObjectContainer.call(this);
	this.createPlanes(3,pAssetName);
	this.positionScale = new PIXI.Point(scalePosX,scalePosY);
};
com.isartdigital.game.HorizontalScrollingPlane.__name__ = ["com","isartdigital","game","HorizontalScrollingPlane"];
com.isartdigital.game.HorizontalScrollingPlane.__super__ = pixi.display.DisplayObjectContainer;
com.isartdigital.game.HorizontalScrollingPlane.prototype = $extend(pixi.display.DisplayObjectContainer.prototype,{
	createPlanes: function(pNumberPlanes,pAssetName) {
		var _g = 0;
		while(_g < pNumberPlanes) {
			var i = _g++;
			var lPlane = new com.isartdigital.game.level.LevelObject(pAssetName + "_part" + (i + 1));
			lPlane.scale.set(1.25,1.25);
			lPlane.position.set((i - 1) * lPlane.width,0);
			this.addChild(lPlane);
			this.planes.push(lPlane);
		}
	}
	,doAction: function() {
		var lPlane;
		this.position.x = com.isartdigital.game.GamePlane.getInstance().position.x * this.positionScale.x;
		this.position.y = com.isartdigital.game.GamePlane.getInstance().position.y * this.positionScale.y;
		if(com.isartdigital.game.sprites.Player.getInstance().scale.x > 0) {
			if(this.toGlobal(this.planes[1].position).x < 0) {
				this.planes[0].position.set(this.planes[this.planes.length - 1].position.x + this.planes[this.planes.length - 1].width,this.planes[this.planes.length - 1].position.y);
				this.planes.push(this.planes.shift());
			}
		} else if(this.toGlobal(this.planes[this.planes.length - 1].position).x > com.isartdigital.Main.getInstance().renderer.width) {
			lPlane = this.planes[this.planes.length - 1];
			lPlane.position.set(this.planes[0].position.x - lPlane.width,lPlane.position.y);
			this.planes.unshift(this.planes.pop());
		}
	}
	,replace: function() {
		var lPlane;
		if(this.toGlobal(this.planes[1].position).x < 0) {
			this.planes[0].position.set(this.planes[this.planes.length - 1].position.x + this.planes[this.planes.length - 1].width,this.planes[this.planes.length - 1].position.y);
			this.planes.push(this.planes.shift());
		}
		if(this.toGlobal(this.planes[this.planes.length - 1].position).x > com.isartdigital.Main.getInstance().renderer.width) {
			lPlane = this.planes[this.planes.length - 1];
			lPlane.position.set(this.planes[0].position.x - lPlane.width,lPlane.position.y);
			this.planes.unshift(this.planes.pop());
		}
	}
	,__class__: com.isartdigital.game.HorizontalScrollingPlane
});
com.isartdigital.game.LevelLoader = function() {
};
com.isartdigital.game.LevelLoader.__name__ = ["com","isartdigital","game","LevelLoader"];
com.isartdigital.game.LevelLoader.getInstance = function() {
	if(com.isartdigital.game.LevelLoader.instance == null) com.isartdigital.game.LevelLoader.instance = new com.isartdigital.game.LevelLoader();
	return com.isartdigital.game.LevelLoader.instance;
};
com.isartdigital.game.LevelLoader.prototype = {
	loadLevel: function(level) {
		if(!this.clearLevel()) return false;
		com.isartdigital.utils.game.StateGraphic.addTextures(com.isartdigital.utils.loader.Loader.getContent("level" + Std.string((function($this) {
			var $r;
			var $int = level;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this))) + "_graphics.json"));
		var pJson = com.isartdigital.utils.loader.Loader.getContent("Level" + Std.string((function($this) {
			var $r;
			var int1 = level;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this))) + ".json");
		var lType;
		var lObj = null;
		com.isartdigital.game.GameManager.getInstance().levelCollectables[com.isartdigital.ui.screens.LevelSelect.currentLevel] = 0;
		com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[com.isartdigital.ui.screens.LevelSelect.currentLevel] = 0;
		var _g = 0;
		var _g1 = Reflect.fields(pJson);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			lType = Reflect.field(pJson,i).type;
			if(lType == "Ground" || lType.indexOf("Wall") == 0 || lType == "LimitLeft" || lType == "LimitRight") {
				lObj = new com.isartdigital.game.level.Wall(lType);
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,0);
				continue;
			} else if(lType == "Destructible") {
				lObj = new com.isartdigital.game.level.Destructible();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
			} else if(lType == "BridgeRight" || lType == "BridgeLeft" || lType.indexOf("Platform") == 0) {
				lObj = new com.isartdigital.game.level.Platform(lType);
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,0);
				continue;
			} else if(lType == "KillZoneStatic") {
				lObj = new com.isartdigital.game.level.KillZone(lType);
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
				continue;
			} else if(lType == "KillZoneDynamic") {
				lObj = new com.isartdigital.game.level.KillZoneDynamic(Reflect.field(pJson,i).rotation);
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
				continue;
			} else if(lType == "Collectable") {
				lObj = new com.isartdigital.game.level.Collectable();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
				com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[com.isartdigital.ui.screens.LevelSelect.currentLevel]++;
				continue;
			} else if(lType == "EnemySpeed") {
				lObj = new com.isartdigital.game.sprites.enemies.EnemySpeed();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
				continue;
			} else if(lType == "EnemyFire") {
				lObj = new com.isartdigital.game.sprites.enemies.EnemyFire();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
				continue;
			} else if(lType == "EnemyTurret") {
				lObj = new com.isartdigital.game.sprites.enemies.EnemyTurret();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
				continue;
			} else if(lType == "EnemyBomb") {
				lObj = new com.isartdigital.game.sprites.enemies.EnemyBomb();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,com.isartdigital.game.GamePlane.getInstance().children.length - 1);
				continue;
			} else if(lType == "Player") {
				lObj = com.isartdigital.game.sprites.Player.getInstance();
				com.isartdigital.game.GameManager.getInstance().spawnPoint.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				lObj.position.set(com.isartdigital.game.GameManager.getInstance().spawnPoint.x,com.isartdigital.game.GameManager.getInstance().spawnPoint.y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				continue;
			} else if(lType == "CheckPoint") {
				lObj = new com.isartdigital.game.sprites.CheckPoint();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,0);
				continue;
			} else if(lType == "EndLevel") {
				lObj = com.isartdigital.game.sprites.EndLevel.getInstance();
				lObj.position.set(Reflect.field(pJson,i).x,Reflect.field(pJson,i).y);
				com.isartdigital.game.GamePlane.getInstance().addChild(lObj);
				com.isartdigital.game.GamePlane.getInstance().setChildIndex(lObj,0);
				continue;
			}
		}
		com.isartdigital.game.GamePlane.getInstance().setChildIndex(com.isartdigital.game.sprites.Player.getInstance(),com.isartdigital.game.GamePlane.getInstance().children.length - 1);
		return true;
	}
	,clearLevel: function() {
		com.isartdigital.game.sprites.Player.getInstance().setModeVoid();
		while(com.isartdigital.game.GamePlane.getInstance().children.length > 0) com.isartdigital.game.GamePlane.getInstance().removeChildAt(0);
		com.isartdigital.game.level.Wall.list = new Array();
		com.isartdigital.game.level.Platform.list = new Array();
		com.isartdigital.game.level.Destructible.list = new Array();
		com.isartdigital.game.level.KillZone.list = new Array();
		com.isartdigital.game.sprites.enemies.Enemy.list = new Array();
		return true;
	}
	,destroy: function() {
		com.isartdigital.game.LevelLoader.instance = null;
	}
	,__class__: com.isartdigital.game.LevelLoader
};
com.isartdigital.utils.game.StateGraphic = function() {
	this.boxType = com.isartdigital.utils.game.BoxType.NONE;
	this.DEFAULT_STATE = "";
	com.isartdigital.utils.game.GameObject.call(this);
};
com.isartdigital.utils.game.StateGraphic.__name__ = ["com","isartdigital","utils","game","StateGraphic"];
com.isartdigital.utils.game.StateGraphic.set_textureDigits = function(pDigits) {
	com.isartdigital.utils.game.StateGraphic.digits = "";
	var _g = 0;
	while(_g < pDigits) {
		var i = _g++;
		com.isartdigital.utils.game.StateGraphic.digits += "0";
	}
	return com.isartdigital.utils.game.StateGraphic.textureDigits = pDigits;
};
com.isartdigital.utils.game.StateGraphic.addTextures = function(pJson) {
	var lFrames = Reflect.field(pJson,"frames");
	if(com.isartdigital.utils.game.StateGraphic.texturesDefinition == null) com.isartdigital.utils.game.StateGraphic.texturesDefinition = new haxe.ds.StringMap();
	if(com.isartdigital.utils.game.StateGraphic.digits == null) com.isartdigital.utils.game.StateGraphic.set_textureDigits(com.isartdigital.utils.game.StateGraphic.textureDigits);
	var lID;
	var lNum;
	var _g = 0;
	var _g1 = Reflect.fields(lFrames);
	while(_g < _g1.length) {
		var lID1 = _g1[_g];
		++_g;
		lID1 = lID1.split(".")[0];
		lNum = Std.parseInt(HxOverrides.substr(lID1,-1 * com.isartdigital.utils.game.StateGraphic.textureDigits,null));
		if(lNum != null) lID1 = HxOverrides.substr(lID1,0,lID1.length - com.isartdigital.utils.game.StateGraphic.textureDigits);
		if(com.isartdigital.utils.game.StateGraphic.texturesDefinition.get(lID1) == null) {
			var v;
			if(lNum == null) v = 1; else v = lNum;
			com.isartdigital.utils.game.StateGraphic.texturesDefinition.set(lID1,v);
			v;
		} else if(lNum > com.isartdigital.utils.game.StateGraphic.texturesDefinition.get(lID1)) {
			com.isartdigital.utils.game.StateGraphic.texturesDefinition.set(lID1,lNum);
			lNum;
		}
	}
	if(com.isartdigital.utils.game.StateGraphic.texturesCache == null) com.isartdigital.utils.game.StateGraphic.texturesCache = new haxe.ds.StringMap();
};
com.isartdigital.utils.game.StateGraphic.clearTextures = function(pJson) {
	var lFrames = Reflect.field(pJson,"frames");
	if(com.isartdigital.utils.game.StateGraphic.texturesDefinition == null) return;
	var lID;
	var lNum;
	var _g = 0;
	var _g1 = Reflect.fields(lFrames);
	while(_g < _g1.length) {
		var lID1 = _g1[_g];
		++_g;
		lID1 = lID1.split(".")[0];
		lNum = Std.parseInt(HxOverrides.substr(lID1,-1 * com.isartdigital.utils.game.StateGraphic.textureDigits,null));
		if(lNum != null) lID1 = HxOverrides.substr(lID1,0,lID1.length - com.isartdigital.utils.game.StateGraphic.textureDigits);
		com.isartdigital.utils.game.StateGraphic.texturesDefinition.set(lID1,null);
		null;
		com.isartdigital.utils.game.StateGraphic.texturesCache.set(lID1,null);
		null;
	}
};
com.isartdigital.utils.game.StateGraphic.addBoxes = function(pJson) {
	if(com.isartdigital.utils.game.StateGraphic.boxesCache == null) com.isartdigital.utils.game.StateGraphic.boxesCache = new haxe.ds.StringMap();
	var lItem;
	var lObj;
	var _g = 0;
	var _g1 = Reflect.fields(pJson);
	while(_g < _g1.length) {
		var lName = _g1[_g];
		++_g;
		lItem = Reflect.field(pJson,lName);
		var v = new haxe.ds.StringMap();
		com.isartdigital.utils.game.StateGraphic.boxesCache.set(lName,v);
		v;
		var _g2 = 0;
		var _g3 = Reflect.fields(lItem);
		while(_g2 < _g3.length) {
			var lObjName = _g3[_g2];
			++_g2;
			lObj = Reflect.field(lItem,lObjName);
			if(lObj.type == "Rectangle") {
				var this1 = com.isartdigital.utils.game.StateGraphic.boxesCache.get(lName);
				var v1 = new PIXI.Rectangle(lObj.x,lObj.y,lObj.width,lObj.height);
				this1.set(lObjName,v1);
				v1;
			} else if(lObj.type == "Ellipse") {
				var this2 = com.isartdigital.utils.game.StateGraphic.boxesCache.get(lName);
				var v2 = new PIXI.Ellipse(lObj.x,lObj.y,lObj.width / 2,lObj.height / 2);
				this2.set(lObjName,v2);
				v2;
			} else if(lObj.type == "Circle") {
				var this3 = com.isartdigital.utils.game.StateGraphic.boxesCache.get(lName);
				var v3 = new PIXI.Circle(lObj.x,lObj.y,lObj.radius);
				this3.set(lObjName,v3);
				v3;
			} else if(lObj.type == "Point") {
				var this4 = com.isartdigital.utils.game.StateGraphic.boxesCache.get(lName);
				var v4 = new PIXI.Point(lObj.x,lObj.y);
				this4.set(lObjName,v4);
				v4;
			}
		}
	}
};
com.isartdigital.utils.game.StateGraphic.__super__ = com.isartdigital.utils.game.GameObject;
com.isartdigital.utils.game.StateGraphic.prototype = $extend(com.isartdigital.utils.game.GameObject.prototype,{
	setAnimEnd: function() {
		this.isAnimEnd = true;
	}
	,setState: function(pState,pLoop,pAutoPlay,pStart) {
		if(pStart == null) pStart = 1;
		if(pAutoPlay == null) pAutoPlay = true;
		if(pLoop == null) pLoop = false;
		if(this.state == pState) return;
		if(this.assetName == null) this.assetName = Type.getClassName(Type.getClass(this)).split(".").pop();
		this.state = pState;
		if(this.anim == null) {
			this.anim = new PIXI.MovieClip(this.getTextures(this.state));
			if(com.isartdigital.utils.game.StateGraphic.animAlpha < 1) this.anim.alpha = com.isartdigital.utils.game.StateGraphic.animAlpha;
			this.addChild(this.anim);
		} else this.anim.textures = this.getTextures(this.state);
		this.isAnimEnd = false;
		this.anim.onComplete = $bind(this,this.setAnimEnd);
		this.anim.loop = pLoop;
		if(this.anim.totalFrames > 1) this.anim.gotoAndStop(pStart); else this.anim.gotoAndStop(0);
		if(pAutoPlay) this.anim.play();
		if(this.box == null) {
			if(this.boxType == com.isartdigital.utils.game.BoxType.SELF) {
				this.box = this.anim;
				return;
			} else {
				this.box = new pixi.display.DisplayObjectContainer();
				if(this.boxType != com.isartdigital.utils.game.BoxType.NONE) this.createBox();
			}
			this.addChild(this.box);
		} else if(this.boxType == com.isartdigital.utils.game.BoxType.MULTIPLE) {
			this.removeChild(this.box);
			this.box = new pixi.display.DisplayObjectContainer();
			this.createBox();
			this.addChild(this.box);
		}
		var anchorsJson = com.isartdigital.utils.loader.Loader.getContent("anchors_level" + Std.string((function($this) {
			var $r;
			var $int = com.isartdigital.ui.screens.LevelSelect.currentLevel;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this))) + ".json");
		var anchor = Reflect.field(anchorsJson,this.state != ""?this.assetName + "_" + this.state:this.assetName);
		if(anchor != null) this.anim.anchor.set(-(anchor.x / this.anim.width),-(anchor.y / this.anim.height));
	}
	,createBox: function() {
		var lBoxes = this.getBox((this.boxType == com.isartdigital.utils.game.BoxType.MULTIPLE?this.state + "_":"") + "box");
		var lChild;
		var $it0 = lBoxes.keys();
		while( $it0.hasNext() ) {
			var lBox = $it0.next();
			lChild = new PIXI.Graphics();
			lChild.alpha = com.isartdigital.utils.game.StateGraphic.boxAlpha;
			lChild.beginFill(16720418);
			if(Std["is"](lBoxes.get(lBox),PIXI.Rectangle)) lChild.drawRect(lBoxes.get(lBox).x,lBoxes.get(lBox).y,lBoxes.get(lBox).width,lBoxes.get(lBox).height); else if(Std["is"](lBoxes.get(lBox),PIXI.Ellipse)) lChild.drawEllipse(lBoxes.get(lBox).x,lBoxes.get(lBox).y,lBoxes.get(lBox).width,lBoxes.get(lBox).height); else if(Std["is"](lBoxes.get(lBox),PIXI.Circle)) lChild.drawCircle(lBoxes.get(lBox).x,lBoxes.get(lBox).y,lBoxes.get(lBox).radius); else if(Std["is"](lBoxes.get(lBox),PIXI.Point)) lChild.drawCircle(0,0,10);
			lChild.endFill();
			lChild.updateCache();
			lChild.name = lBox;
			if(Std["is"](lBoxes.get(lBox),PIXI.Point)) lChild.position.set(lBoxes.get(lBox).x,lBoxes.get(lBox).y); else lChild.hitArea = lBoxes.get(lBox);
			this.box.addChild(lChild);
		}
		this.box.renderable = false;
	}
	,getTextures: function(pState) {
		var lID;
		if(pState == this.DEFAULT_STATE) lID = this.assetName + ""; else lID = this.assetName + "_" + pState + "";
		if(com.isartdigital.utils.game.StateGraphic.texturesCache.get(lID) == null) {
			var lFrames = com.isartdigital.utils.game.StateGraphic.texturesDefinition.get(lID);
			if((function($this) {
				var $r;
				var $int = lFrames;
				$r = $int < 0?4294967296.0 + $int:$int + 0.0;
				return $r;
			}(this)) == 1) {
				var v = [PIXI.Texture.fromFrame(lID + ".png")];
				com.isartdigital.utils.game.StateGraphic.texturesCache.set(lID,v);
				v;
			} else {
				var v1 = new Array();
				com.isartdigital.utils.game.StateGraphic.texturesCache.set(lID,v1);
				v1;
				var _g1 = 1;
				var _g = lFrames + 1;
				while(_g1 < _g) {
					var i = _g1++;
					com.isartdigital.utils.game.StateGraphic.texturesCache.get(lID).push(PIXI.Texture.fromFrame(lID + HxOverrides.substr(com.isartdigital.utils.game.StateGraphic.digits + i,-1 * com.isartdigital.utils.game.StateGraphic.textureDigits,null) + ".png"));
				}
			}
		}
		return com.isartdigital.utils.game.StateGraphic.texturesCache.get(lID);
	}
	,getBox: function(pState) {
		return com.isartdigital.utils.game.StateGraphic.boxesCache.get(this.assetName + "_" + pState);
	}
	,pause: function() {
		if(this.anim != null) this.anim.stop();
	}
	,resume: function() {
		if(this.anim != null) this.anim.play();
	}
	,get_hitBox: function() {
		return this.box;
	}
	,get_hitPoints: function() {
		return null;
	}
	,destroy: function() {
		this.anim.stop();
		this.removeChild(this.anim);
		this.anim = null;
		this.removeChild(this.box);
		this.box = null;
		com.isartdigital.utils.game.GameObject.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.utils.game.StateGraphic
});
com.isartdigital.game.level = {};
com.isartdigital.game.level.Collectable = function() {
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState(this.DEFAULT_STATE);
	this.setModeNormal();
	com.isartdigital.game.level.Collectable.list.push(this);
};
com.isartdigital.game.level.Collectable.__name__ = ["com","isartdigital","game","level","Collectable"];
com.isartdigital.game.level.Collectable.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.level.Collectable.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	doActionNormal: function() {
		if(com.isartdigital.game.sprites.Player.getInstance().isDead) return;
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.get_hitBox().getChildAt(0))) {
			if(com.isartdigital.game.sprites.Player.getInstance().shieldUnlocked) {
				com.isartdigital.game.GameManager.getInstance().collectedCollectableForShield++;
				com.isartdigital.game.GameManager.getInstance().levelCollectables[com.isartdigital.ui.screens.LevelSelect.currentLevel]++;
				if((function($this) {
					var $r;
					var a = com.isartdigital.game.GameManager.getInstance().collectedCollectableForShield;
					var aNeg = a < 0;
					var bNeg = 5 < 0;
					$r = aNeg != bNeg?aNeg:a >= 5;
					return $r;
				}(this))) {
					com.isartdigital.game.sprites.Player.getInstance().giveShield();
					com.isartdigital.game.GameManager.getInstance().collectedCollectableForShield = 0;
				}
			}
			this.destroy();
		}
	}
	,destroy: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.destroy.call(this);
		HxOverrides.remove(com.isartdigital.game.level.Collectable.list,this);
		if(this.parent != null) this.parent.removeChildAt(this.parent.getChildIndex(this));
	}
	,__class__: com.isartdigital.game.level.Collectable
});
com.isartdigital.game.level.Destructible = function() {
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState(this.DEFAULT_STATE);
	com.isartdigital.game.level.Destructible.list.push(this);
};
com.isartdigital.game.level.Destructible.__name__ = ["com","isartdigital","game","level","Destructible"];
com.isartdigital.game.level.Destructible.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.level.Destructible.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	destroy: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.destroy.call(this);
		HxOverrides.remove(com.isartdigital.game.level.Destructible.list,this);
	}
	,__class__: com.isartdigital.game.level.Destructible
});
com.isartdigital.game.level.KillZone = function(pAssetName) {
	this.isStatic = true;
	this.assetName = pAssetName;
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState(this.DEFAULT_STATE);
	this.setModeNormal();
	com.isartdigital.game.level.KillZone.list.push(this);
};
com.isartdigital.game.level.KillZone.__name__ = ["com","isartdigital","game","level","KillZone"];
com.isartdigital.game.level.KillZone.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.level.KillZone.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	doActionNormal: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.doActionNormal.call(this);
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(this.box,com.isartdigital.game.sprites.Player.getInstance().get_hitBox())) com.isartdigital.game.sprites.Player.getInstance().die();
	}
	,destroy: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.destroy.call(this);
		HxOverrides.remove(com.isartdigital.game.level.KillZone.list,this);
	}
	,__class__: com.isartdigital.game.level.KillZone
});
com.isartdigital.game.level.KillZoneDynamic = function(rotationStart) {
	this.speed = new PIXI.Point(5,5);
	this.distanceTraveled = 0;
	this.forwardRotation = 0;
	this.forwardRotation = rotationStart * com.isartdigital.game.level.KillZoneDynamic.TO_RADIAN;
	com.isartdigital.game.level.KillZone.call(this,"KillZoneDynamic");
	this.isStatic = false;
};
com.isartdigital.game.level.KillZoneDynamic.__name__ = ["com","isartdigital","game","level","KillZoneDynamic"];
com.isartdigital.game.level.KillZoneDynamic.__super__ = com.isartdigital.game.level.KillZone;
com.isartdigital.game.level.KillZoneDynamic.prototype = $extend(com.isartdigital.game.level.KillZone.prototype,{
	doActionNormal: function() {
		this.rotation += 0.2;
		this.distanceTraveled += this.speed.x;
		if(this.distanceTraveled > (function($this) {
			var $r;
			var $int;
			{
				var int1 = 1000;
				if(int1 < 0) $int = 4294967296.0 + int1; else $int = int1 + 0.0;
			}
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) || this.distanceTraveled < 0) {
			this.speed.x *= -1;
			this.speed.y *= -1;
		}
		this.position.x += Math.cos(this.forwardRotation) * this.speed.x;
		this.position.y += Math.sin(this.forwardRotation) * this.speed.y;
		com.isartdigital.game.level.KillZone.prototype.doActionNormal.call(this);
	}
	,__class__: com.isartdigital.game.level.KillZoneDynamic
});
com.isartdigital.game.level.LevelObject = function(pAssetName) {
	this.assetName = pAssetName;
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.setState(this.DEFAULT_STATE);
};
com.isartdigital.game.level.LevelObject.__name__ = ["com","isartdigital","game","level","LevelObject"];
com.isartdigital.game.level.LevelObject.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.level.LevelObject.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	__class__: com.isartdigital.game.level.LevelObject
});
com.isartdigital.game.level.Platform = function(pAssetName) {
	this.assetName = pAssetName;
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState(this.DEFAULT_STATE);
	com.isartdigital.game.level.Platform.list.push(this);
};
com.isartdigital.game.level.Platform.__name__ = ["com","isartdigital","game","level","Platform"];
com.isartdigital.game.level.Platform.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.level.Platform.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	destroy: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.destroy.call(this);
		HxOverrides.remove(com.isartdigital.game.level.Platform.list,this);
	}
	,__class__: com.isartdigital.game.level.Platform
});
com.isartdigital.game.level.Wall = function(pAssetName) {
	this.assetName = pAssetName;
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState(this.DEFAULT_STATE);
	com.isartdigital.game.level.Wall.list.push(this);
};
com.isartdigital.game.level.Wall.__name__ = ["com","isartdigital","game","level","Wall"];
com.isartdigital.game.level.Wall.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.level.Wall.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	destroy: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.destroy.call(this);
		HxOverrides.remove(com.isartdigital.game.level.Wall.list,this);
	}
	,__class__: com.isartdigital.game.level.Wall
});
com.isartdigital.game.sprites = {};
com.isartdigital.game.sprites.CheckPoint = function() {
	this.STATE_ON = "on";
	this.STATE_OFF = "off";
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState(this.STATE_OFF);
	com.isartdigital.game.sprites.CheckPoint.list.push(this);
};
com.isartdigital.game.sprites.CheckPoint.__name__ = ["com","isartdigital","game","sprites","CheckPoint"];
com.isartdigital.game.sprites.CheckPoint.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.sprites.CheckPoint.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	activeCheckPoint: function() {
		if(this.state == this.STATE_OFF) {
			this.setState(this.STATE_ON);
			return true;
		}
		return false;
	}
	,destroy: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.game.sprites.CheckPoint
});
com.isartdigital.game.sprites.EndLevel = function() {
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState(this.DEFAULT_STATE);
};
com.isartdigital.game.sprites.EndLevel.__name__ = ["com","isartdigital","game","sprites","EndLevel"];
com.isartdigital.game.sprites.EndLevel.getInstance = function() {
	if(com.isartdigital.game.sprites.EndLevel.instance == null) com.isartdigital.game.sprites.EndLevel.instance = new com.isartdigital.game.sprites.EndLevel();
	return com.isartdigital.game.sprites.EndLevel.instance;
};
com.isartdigital.game.sprites.EndLevel.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.sprites.EndLevel.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	destroy: function() {
		com.isartdigital.game.sprites.EndLevel.instance = null;
	}
	,__class__: com.isartdigital.game.sprites.EndLevel
});
com.isartdigital.game.sprites.MovableEntity = function() {
	this.maxVspeed = 30;
	this.maxHspeed = 30;
	this.friction = new PIXI.Point(0,0);
	this.acceleration = new PIXI.Point(0,0);
	this.speed = new PIXI.Point(0,0);
	com.isartdigital.utils.game.StateGraphic.call(this);
};
com.isartdigital.game.sprites.MovableEntity.__name__ = ["com","isartdigital","game","sprites","MovableEntity"];
com.isartdigital.game.sprites.MovableEntity.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.sprites.MovableEntity.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	doActionNormal: function() {
		com.isartdigital.utils.game.StateGraphic.prototype.doActionNormal.call(this);
	}
	,move: function() {
		this.speed.x += this.acceleration.x;
		this.speed.y += this.acceleration.y;
		this.speed.x *= this.friction.x;
		this.speed.y *= this.friction.y;
		this.position.x += (this.speed.x < 0?-1:1) * Math.min(Math.abs(this.speed.x),this.maxHspeed);
		this.position.y += (this.speed.y < 0?-1:1) * Math.min(Math.abs(this.speed.y),this.maxVspeed);
		this.acceleration.set(0,0);
	}
	,__class__: com.isartdigital.game.sprites.MovableEntity
});
com.isartdigital.game.sprites.Player = function() {
	this.shield = new com.isartdigital.game.sprites.Shield();
	this.blinkCounter = 0;
	this.haveDoubleJump = false;
	this.shieldUnlocked = false;
	this.haveSuperShoot = false;
	this.hasShield = false;
	this.canSuperShoot = false;
	this.godMode = false;
	this.isDead = false;
	this.canDoubleJump = true;
	this.canSimpleJump = true;
	this.spaceRepeat = false;
	this.superShootCounter = 0;
	this.platformJumpCounter = 0;
	this.impulseCounter = 0;
	this.impulseDuration = 8;
	this.frictionAir = 0.9;
	this.frictionGround = 0.8;
	this.accelerationAir = 3.3;
	this.accelerationGround = 4.75;
	this.GRAVITY = 4.0;
	this.JUMP_IMPULSE = 20.0;
	com.isartdigital.game.sprites.MovableEntity.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState("wait",true);
	this.maxHspeed = 30;
	this.maxVspeed = 30;
	this.addChild(this.shield);
	this.shield.visible = false;
	this.cameraPosX = this.cameraPoint().position.x;
};
com.isartdigital.game.sprites.Player.__name__ = ["com","isartdigital","game","sprites","Player"];
com.isartdigital.game.sprites.Player.getInstance = function() {
	if(com.isartdigital.game.sprites.Player.instance == null) com.isartdigital.game.sprites.Player.instance = new com.isartdigital.game.sprites.Player();
	return com.isartdigital.game.sprites.Player.instance;
};
com.isartdigital.game.sprites.Player.__super__ = com.isartdigital.game.sprites.MovableEntity;
com.isartdigital.game.sprites.Player.prototype = $extend(com.isartdigital.game.sprites.MovableEntity.prototype,{
	start: function() {
		com.isartdigital.game.sprites.MovableEntity.prototype.start.call(this);
		this.isDead = false;
		this.spaceRepeat = false;
		this.canSimpleJump = true;
		this.canDoubleJump = false;
		this.godMode = false;
		this.speed.set(0,0);
		this.blinkCounter = 0;
		this.setModeNormal();
	}
	,get_hitBox: function() {
		return this.box.getChildByName("mcBox");
	}
	,setModeNormal: function() {
		this.setState("wait",true);
		this.speed.set(0,0);
		this.anim.animationSpeed = 0.5;
		this.canSimpleJump = true;
		com.isartdigital.game.sprites.MovableEntity.prototype.setModeNormal.call(this);
	}
	,setModeWalk: function() {
		this.setState("walk",true);
		this.doAction = $bind(this,this.doActionWalk);
		this.friction.set(this.frictionGround,0);
	}
	,setModeJump: function() {
		this.setState("jump",false);
		this.speed.y = 0;
		this.friction.set(this.frictionAir,this.frictionAir);
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(37) || com.isartdigital.ui.hud.Hud.getInstance().isBtnLeftPressed) this.acceleration.x = -this.accelerationAir; else if(com.isartdigital.utils.ui.Keyboard.getKeyDown(39) || com.isartdigital.ui.hud.Hud.getInstance().isBtnRightPressed) this.acceleration.x = this.accelerationAir;
		this.doAction = $bind(this,this.doActionJump);
		this.impulseCounter = 0;
	}
	,setModeFall: function() {
		this.setState("fall",false);
		this.doAction = $bind(this,this.doActionFall);
		this.canSimpleJump = false;
		this.friction.set(this.frictionAir,this.frictionAir);
	}
	,setModeReception: function() {
		this.setState("reception",false);
		this.speed.y = 0;
		this.canSimpleJump = true;
		this.doAction = $bind(this,this.doActionReception);
	}
	,setModeHurt: function() {
		this.setState("hurt");
		this.speed.set(10 * this.scale.x,0);
		this.doAction = $bind(this,this.doActionDead);
		this.friction.set(this.frictionAir,this.frictionAir);
		this.impulseCounter = 0;
	}
	,setModeEndLevel: function() {
		this.setState("walk",true);
		com.isartdigital.utils.game.Camera.getInstance().setFocus(null);
		this.doAction = $bind(this,this.doActionEndLevel);
		this.friction.set(this.frictionGround,0);
		this.flipRight();
		this.godMode = true;
	}
	,doActionEndLevel: function() {
		this.acceleration.set(this.accelerationGround,0);
		this.move();
		if(this.toGlobal(new PIXI.Point(0,0)).x - this.anim.width > com.isartdigital.Main.getInstance().renderer.width) {
			com.isartdigital.ui.popin.EndLevelScreen.getInstance().setCollectableNumber(com.isartdigital.game.GameManager.getInstance().levelCollectables[com.isartdigital.ui.screens.LevelSelect.currentLevel],com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[com.isartdigital.ui.screens.LevelSelect.currentLevel]);
			com.isartdigital.ui.screens.LevelSelect.getInstance().updateCollectableNumbers();
			com.isartdigital.ui.UIManager.getInstance().openPopin(com.isartdigital.ui.popin.EndLevelScreen.getInstance());
			com.isartdigital.game.GameManager.getInstance().pause();
			this.setModeVoid();
		}
	}
	,doActionNormal: function() {
		this.cameraSmooth();
		this.spaceState();
		this.shootState();
		if(!this.hitFloor(this.checkBottom())) {
			this.setModeFall();
			this.canDoubleJump = true;
		}
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(39) || com.isartdigital.ui.hud.Hud.getInstance().isBtnRightPressed) {
			this.flipRight();
			if(!this.faceWithWall()) this.setModeWalk();
		} else if(com.isartdigital.utils.ui.Keyboard.getKeyDown(37) || com.isartdigital.ui.hud.Hud.getInstance().isBtnLeftPressed) {
			this.flipLeft();
			if(!this.faceWithWall()) this.setModeWalk();
		}
		this.checkCollisionWithCheckPoint();
		this.checkCollisionWithEnd();
		this.doActionBlink();
	}
	,cameraSmooth: function() {
		if(this.cameraPoint().position.x < this.cameraPosX) this.cameraPoint().position.x += (this.cameraPosX - this.cameraPoint().position.x) * 0.1;
	}
	,doActionWalk: function() {
		this.spaceState();
		this.cameraSmooth();
		this.shootState();
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(39) || com.isartdigital.ui.hud.Hud.getInstance().isBtnRightPressed) {
			this.flipRight();
			this.acceleration.set(this.accelerationGround,0);
		} else if(com.isartdigital.utils.ui.Keyboard.getKeyDown(37) || com.isartdigital.ui.hud.Hud.getInstance().isBtnLeftPressed) {
			this.flipLeft();
			this.acceleration.set(-this.accelerationGround,0);
		}
		if(this.canFall()) {
			this.setModeFall();
			this.canSimpleJump = false;
			this.canDoubleJump = true;
			return;
		}
		if(Math.abs(this.speed.x) < 1) this.setModeNormal();
		if(this.faceWithWall()) {
			this.position.x -= this.acceleration.x;
			this.speed.x = 0;
			this.acceleration.x = 0;
		}
		this.move();
		this.checkCollisionWithCheckPoint();
		this.checkCollisionWithEnd();
		this.doActionBlink();
	}
	,checkCollisionWithCheckPoint: function() {
		var _g1 = 0;
		var _g = com.isartdigital.game.sprites.CheckPoint.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.CheckPoint.list[i].box,this.get_hitBox())) {
				if(com.isartdigital.game.sprites.CheckPoint.list[i].activeCheckPoint()) com.isartdigital.game.GameManager.getInstance().spawnPoint = com.isartdigital.game.sprites.CheckPoint.list[i].position;
			}
		}
	}
	,checkCollisionWithEnd: function() {
		if(this.position.x > com.isartdigital.game.sprites.EndLevel.getInstance().x) this.setModeEndLevel();
	}
	,doActionJump: function() {
		this.cameraSmooth();
		this.spaceState();
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(39) || com.isartdigital.ui.hud.Hud.getInstance().isBtnRightPressed) {
			this.flipRight();
			this.acceleration.x = this.accelerationAir;
		} else if(com.isartdigital.utils.ui.Keyboard.getKeyDown(37) || com.isartdigital.ui.hud.Hud.getInstance().isBtnLeftPressed) {
			this.flipLeft();
			this.acceleration.x = -this.accelerationAir;
		}
		if((function($this) {
			var $r;
			var a = $this.impulseCounter++;
			var b = $this.impulseDuration;
			$r = (function($this) {
				var $r;
				var aNeg = b < 0;
				var bNeg = a < 0;
				$r = aNeg != bNeg?aNeg:b > a;
				return $r;
			}($this));
			return $r;
		}(this))) this.acceleration.y = -this.JUMP_IMPULSE;
		this.acceleration.y += this.GRAVITY;
		if(this.faceWithWall()) {
			this.speed.x = 0;
			this.acceleration.x = 0;
		}
		this.move();
		if(this.speed.y > 0) {
			this.setModeFall();
			return;
		}
		if(this.testPoint(com.isartdigital.game.level.Wall.list,this.hitTop()) != null || this.testPoint(com.isartdigital.game.level.Destructible.list,this.hitTop()) != null) {
			this.speed.y = 0;
			this.setModeFall();
			return;
		}
		this.doActionBlink();
		this.checkCollisionWithCheckPoint();
		this.checkCollisionWithEnd();
	}
	,doActionFall: function() {
		this.cameraSmooth();
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(39) || com.isartdigital.ui.hud.Hud.getInstance().isBtnRightPressed) {
			this.flipRight();
			this.acceleration.x = this.accelerationAir;
		} else if(com.isartdigital.utils.ui.Keyboard.getKeyDown(37) || com.isartdigital.ui.hud.Hud.getInstance().isBtnLeftPressed) {
			this.flipLeft();
			this.acceleration.x = -this.accelerationAir;
		}
		this.acceleration.y += this.GRAVITY;
		if(this.faceWithWall()) {
			this.speed.x = 0;
			this.acceleration.x = 0;
		}
		this.move();
		if(this.hitFloor()) this.setModeReception();
		this.spaceState();
		this.doActionBlink();
		this.checkCollisionWithCheckPoint();
		this.checkCollisionWithEnd();
	}
	,doActionReception: function() {
		this.cameraSmooth();
		this.spaceState();
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(39) || com.isartdigital.ui.hud.Hud.getInstance().isBtnRightPressed) {
			this.flipRight();
			this.acceleration.x = this.accelerationAir;
		}
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(37) || com.isartdigital.ui.hud.Hud.getInstance().isBtnLeftPressed) {
			this.flipLeft();
			this.acceleration.x = -this.accelerationAir;
		}
		if(this.faceWithWall()) {
			this.speed.x = 0;
			this.acceleration.x = 0;
		}
		this.move();
		if(this.isAnimEnd) {
			if(com.isartdigital.utils.ui.Keyboard.getKeyDown(39) || com.isartdigital.ui.hud.Hud.getInstance().isBtnRightPressed || com.isartdigital.utils.ui.Keyboard.getKeyDown(37) || com.isartdigital.ui.hud.Hud.getInstance().isBtnLeftPressed) this.setModeWalk(); else this.setModeNormal();
		}
		this.doActionBlink();
		this.checkCollisionWithCheckPoint();
		this.checkCollisionWithEnd();
	}
	,doActionDead: function() {
		this.cameraSmooth();
		if((function($this) {
			var $r;
			var a = $this.impulseCounter++;
			var b = $this.impulseDuration;
			$r = (function($this) {
				var $r;
				var aNeg = b < 0;
				var bNeg = a < 0;
				$r = aNeg != bNeg?aNeg:b > a;
				return $r;
			}($this));
			return $r;
		}(this))) this.acceleration.y = -this.JUMP_IMPULSE; else this.acceleration.y += this.GRAVITY;
		this.move();
		if(this.toGlobal(new PIXI.Point(0,0)).y - this.anim.width > com.isartdigital.Main.getInstance().renderer.height) com.isartdigital.game.GameManager.getInstance().respawnPlayer();
	}
	,doActionBlink: function() {
		if(this.blinkCounter > 0) {
			this.blinkCounter--;
			if(this.blinkCounter > 0) if(this.blinkCounter % 4 > 1) this.alpha = 1; else this.alpha = 0; else this.alpha = 1;
		}
	}
	,shootState: function() {
		if(!com.isartdigital.utils.ui.Keyboard.getKeyDown(81) && !com.isartdigital.ui.hud.Hud.getInstance().isBtnShootPressed) {
			if(this.canSuperShoot && this.haveSuperShoot) {
				var lShoot = new com.isartdigital.game.sprites.shoots.SuperShoot(this.scale.x > 0.0?0.0:180.0 * com.isartdigital.game.sprites.Player.TO_RADIAN);
				com.isartdigital.game.GamePlane.getInstance().addChild(lShoot);
				var pos = com.isartdigital.game.GamePlane.getInstance().toLocal(this.toGlobal(this.box.getChildByName("mcGun").position));
				lShoot.position.set(pos.x,pos.y);
				this.canSuperShoot = false;
				return true;
			}
			this.superShootCounter = 0;
		}
		if(com.isartdigital.utils.ui.Keyboard.getKeyDown(81) || com.isartdigital.ui.hud.Hud.getInstance().isBtnShootPressed) {
			this.superShootCounter++;
			if(this.superShootCounter == 1) {
				var lShoot1 = new com.isartdigital.game.sprites.shoots.SimpleShoot(this.scale.x > 0.0?0.0:180.0 * com.isartdigital.game.sprites.Player.TO_RADIAN);
				com.isartdigital.game.GamePlane.getInstance().addChild(lShoot1);
				var pos1 = com.isartdigital.game.GamePlane.getInstance().toLocal(this.toGlobal(this.box.getChildByName("mcGun").position));
				lShoot1.position.set(pos1.x,pos1.y);
			} else if(this.superShootCounter == 30) this.canSuperShoot = true;
			return true;
		}
		return false;
	}
	,spaceState: function() {
		if(!com.isartdigital.utils.ui.Keyboard.getKeyDown(83) && !com.isartdigital.ui.hud.Hud.getInstance().isBtnJumpPressed) {
			this.spaceRepeat = false;
			this.impulseCounter = this.impulseDuration;
		}
		if(!this.spaceRepeat) {
			if(com.isartdigital.utils.ui.Keyboard.getKeyDown(83) || com.isartdigital.ui.hud.Hud.getInstance().isBtnJumpPressed) {
				if(this.canSimpleJump) {
					this.canDoubleJump = true;
					this.canSimpleJump = false;
					this.setModeJump();
				} else if(this.canDoubleJump && this.haveDoubleJump) {
					this.canDoubleJump = false;
					this.setModeJump();
				}
				this.spaceRepeat = true;
			}
		}
	}
	,giveShield: function() {
		this.hasShield = true;
		this.shield.visible = true;
	}
	,flipRight: function() {
		if(this.scale.x != 1) {
			this.cameraPoint().position.x = -this.cameraPoint().position.x;
			this.scale.set(1,1);
			com.isartdigital.utils.game.Camera.getInstance().setPosition();
		}
	}
	,flipLeft: function() {
		if(this.scale.x != -1) {
			this.cameraPoint().position.x = -this.cameraPoint().position.x;
			this.scale.set(-1,1);
			com.isartdigital.utils.game.Camera.getInstance().setPosition();
		}
	}
	,hitFloor: function(pPoint) {
		if(pPoint == null) pPoint = this.hitBottom();
		var lCollision = this.testPoint(com.isartdigital.game.level.Wall.list,pPoint);
		if(lCollision == null) lCollision = this.testPoint(com.isartdigital.game.level.Platform.list,pPoint);
		if(lCollision == null) lCollision = this.testPoint(com.isartdigital.game.level.Destructible.list,pPoint);
		if(lCollision != null) {
			this.floor = lCollision;
			this.y = lCollision.y;
			return true;
		}
		return false;
	}
	,testPoint: function(pList,pPoint) {
		var _g1 = 0;
		var _g = pList.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!(js.Boot.__cast(pList[i] , com.isartdigital.utils.game.StateGraphic)).visible) continue;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint((js.Boot.__cast(pList[i] , com.isartdigital.utils.game.StateGraphic)).get_hitBox(),pPoint)) return js.Boot.__cast(pList[i] , com.isartdigital.utils.game.StateGraphic);
		}
		return null;
	}
	,testBox: function() {
		var _g1 = 0;
		var _g = com.isartdigital.game.level.Wall.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!com.isartdigital.game.level.Wall.list[i].visible) continue;
			if(com.isartdigital.utils.game.CollisionManager.hitTestObject((js.Boot.__cast(com.isartdigital.game.level.Wall.list[i] , com.isartdigital.utils.game.StateGraphic)).get_hitBox(),this.box.getChildAt(0))) return js.Boot.__cast(com.isartdigital.game.level.Wall.list[i] , com.isartdigital.utils.game.StateGraphic);
		}
		var _g11 = 0;
		var _g2 = com.isartdigital.game.level.Platform.list.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(!com.isartdigital.game.level.Platform.list[i1].visible) continue;
			if(com.isartdigital.utils.game.CollisionManager.hitTestObject((js.Boot.__cast(com.isartdigital.game.level.Platform.list[i1] , com.isartdigital.utils.game.StateGraphic)).get_hitBox(),this.box.getChildAt(0))) return js.Boot.__cast(com.isartdigital.game.level.Platform.list[i1] , com.isartdigital.utils.game.StateGraphic);
		}
		var _g12 = 0;
		var _g3 = com.isartdigital.game.level.Destructible.list.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			if(!com.isartdigital.game.level.Destructible.list[i2].visible) continue;
			if(com.isartdigital.utils.game.CollisionManager.hitTestObject((js.Boot.__cast(com.isartdigital.game.level.Destructible.list[i2] , com.isartdigital.utils.game.StateGraphic)).get_hitBox(),this.box.getChildAt(0))) return js.Boot.__cast(com.isartdigital.game.level.Destructible.list[i2] , com.isartdigital.utils.game.StateGraphic);
		}
		return null;
	}
	,canFall: function() {
		if(this.floor != null && this.testPoint([this.floor],this.checkBottom()) == this.floor) return false;
		return !this.hitFloor(this.checkBottom());
	}
	,faceWithWall: function() {
		var _g1 = 0;
		var _g = com.isartdigital.game.level.Wall.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!com.isartdigital.game.level.Wall.list[i].visible) continue;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.level.Wall.list[i].get_hitBox().getChildAt(0),this.hitFront())) {
				this.speed.x = 0;
				return true;
			}
		}
		var _g11 = 0;
		var _g2 = com.isartdigital.game.level.Destructible.list.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(!com.isartdigital.game.level.Destructible.list[i1].visible) continue;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.level.Destructible.list[i1].get_hitBox().getChildAt(0),this.hitFront())) {
				this.speed.x = 0;
				return true;
			}
		}
		return false;
	}
	,die: function() {
		if(this.godMode) return;
		if(this.isDead) return;
		if(this.blinkCounter > 0) return;
		this.impulseCounter = this.impulseDuration * 2;
		this.speed.set(0,0);
		if(!this.hasShield) {
			this.setModeHurt();
			com.isartdigital.utils.game.Camera.getInstance().setFocus(null);
			this.isDead = true;
		} else {
			this.shield.visible = false;
			this.blinkCounter = 60;
			this.setModeJump();
			this.impulseCounter = this.impulseDuration * 2;
			this.setState("hurt");
			this.speed.set(10 * this.scale.x,0);
			this.friction.set(this.frictionAir,this.frictionAir);
			this.hasShield = false;
		}
	}
	,hitTop: function() {
		return this.box.toGlobal(this.box.getChildByName("mcTop").position);
	}
	,hitBottom: function() {
		return this.box.toGlobal(this.box.getChildByName("mcBottom").position);
	}
	,checkTop: function() {
		return this.box.toGlobal(this.box.getChildByName("mcCheckTop").position);
	}
	,checkBottom: function() {
		return this.box.toGlobal(this.box.getChildByName("mcCheckBottom").position);
	}
	,hitFront: function() {
		return this.box.toGlobal(this.box.getChildByName("mcFront").position);
	}
	,cameraPoint: function() {
		return this.box.getChildByName("mcCamera");
	}
	,destroy: function() {
		com.isartdigital.game.sprites.Player.instance = null;
	}
	,__class__: com.isartdigital.game.sprites.Player
});
com.isartdigital.game.sprites.Shield = function() {
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.NONE;
	this.setState(this.DEFAULT_STATE,true);
};
com.isartdigital.game.sprites.Shield.__name__ = ["com","isartdigital","game","sprites","Shield"];
com.isartdigital.game.sprites.Shield.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.sprites.Shield.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	__class__: com.isartdigital.game.sprites.Shield
});
com.isartdigital.game.sprites.enemies = {};
com.isartdigital.game.sprites.enemies.Enemy = function() {
	this.life = 0;
	this.canBeKilled = true;
	this.blinkCounter = 0;
	this.shootCounter = 0;
	this.enemySpeed = 10;
	this.distanceTraveled = 0;
	com.isartdigital.game.sprites.MovableEntity.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.setState("wait");
	com.isartdigital.game.sprites.enemies.Enemy.list.push(this);
	this.scale.x = -1;
};
com.isartdigital.game.sprites.enemies.Enemy.__name__ = ["com","isartdigital","game","sprites","enemies","Enemy"];
com.isartdigital.game.sprites.enemies.Enemy.__super__ = com.isartdigital.game.sprites.MovableEntity;
com.isartdigital.game.sprites.enemies.Enemy.prototype = $extend(com.isartdigital.game.sprites.MovableEntity.prototype,{
	setModeNormal: function() {
		com.isartdigital.game.sprites.MovableEntity.prototype.setModeNormal.call(this);
		this.setState("wait");
		var $int = 1000;
		if($int < 0) this.distanceTraveled = 4294967296.0 + $int; else this.distanceTraveled = $int + 0.0;
	}
	,setModeWalk: function() {
		this.setState("walk",true);
		this.doAction = $bind(this,this.doActionWalk);
	}
	,setModeDead: function() {
		this.setState("death");
		this.doAction = $bind(this,this.doActionDead);
		this.blinkCounter = 60;
		this.canBeKilled = false;
	}
	,doActionNormal: function() {
		com.isartdigital.game.sprites.MovableEntity.prototype.doActionNormal.call(this);
		this.checkCollisionWithPlayer();
	}
	,doActionWalk: function() {
		this.position.x += this.enemySpeed;
		if(this.distanceTraveled >= (function($this) {
			var $r;
			var $int;
			{
				var int1 = 1000;
				if(int1 < 0) $int = 4294967296.0 + int1; else $int = int1 + 0.0;
			}
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) || this.distanceTraveled < 0) {
			this.enemySpeed *= -1;
			if(this.enemySpeed > 0) this.scale.x = 1; else this.scale.x = -1;
		}
		this.distanceTraveled += this.enemySpeed;
		this.checkCollisionWithPlayer();
	}
	,doActionDead: function() {
		if(this.isAnimEnd && this.state == "death") {
			if(this.blinkCounter > 0) {
				this.blinkCounter--;
				if(this.blinkCounter > 0) if(this.blinkCounter % 4 > 1) this.alpha = 1; else this.alpha = 0; else {
					this.destroy();
					return;
				}
			}
		}
	}
	,checkCollisionWithPlayer: function() {
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcBody"))) com.isartdigital.game.sprites.Player.getInstance().die();
	}
	,shoot: function(pRotation) {
		var lShoot = new com.isartdigital.game.sprites.shoots.EnemyShoot(pRotation,"EnemyTurret");
		com.isartdigital.game.GamePlane.getInstance().addChild(lShoot);
		var lPos = com.isartdigital.game.GamePlane.getInstance().toLocal(this.toGlobal(this.box.getChildByName("mcGun").position));
		lShoot.position.set(lPos.x,lPos.y);
		this.shootCounter = 45;
	}
	,destroy: function() {
		com.isartdigital.game.sprites.MovableEntity.prototype.destroy.call(this);
		this.setModeVoid();
		HxOverrides.remove(com.isartdigital.game.sprites.enemies.Enemy.list,this);
	}
	,__class__: com.isartdigital.game.sprites.enemies.Enemy
});
com.isartdigital.game.sprites.enemies.EnemyBomb = function() {
	this.counterExplosion = 0;
	this.DEFAULT_LIFE = 3;
	com.isartdigital.game.sprites.enemies.Enemy.call(this);
	this.setModeNormal();
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.life = this.DEFAULT_LIFE;
	this.anim.scale.set(-1,1);
};
com.isartdigital.game.sprites.enemies.EnemyBomb.__name__ = ["com","isartdigital","game","sprites","enemies","EnemyBomb"];
com.isartdigital.game.sprites.enemies.EnemyBomb.__super__ = com.isartdigital.game.sprites.enemies.Enemy;
com.isartdigital.game.sprites.enemies.EnemyBomb.prototype = $extend(com.isartdigital.game.sprites.enemies.Enemy.prototype,{
	setModeWalk: function() {
		com.isartdigital.game.sprites.enemies.Enemy.prototype.setModeWalk.call(this);
		this.anim.anchor.x *= -1;
	}
	,setModeDead: function() {
		com.isartdigital.game.sprites.enemies.Enemy.prototype.setModeDead.call(this);
		this.setState("hurt");
		this.anim.anchor.x *= -1;
	}
	,setModeExplosion: function() {
		this.setState("death");
		this.anim.anchor.x *= -1;
		this.doAction = $bind(this,this.doActionExplosion);
	}
	,doActionNormal: function() {
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcView")) || com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcRange")) || this.life != this.DEFAULT_LIFE) this.setModeWalk();
	}
	,doActionWalk: function() {
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcRange"))) {
			this.counterExplosion++;
			if(this.counterExplosion >= 60) {
				this.setModeDead();
				return;
			}
		}
		com.isartdigital.game.sprites.enemies.Enemy.prototype.doActionWalk.call(this);
		this.box.getChildByName("mcView").position.x = (-this.distanceTraveled + 500) * this.scale.x;
	}
	,doActionDead: function() {
		if(this.blinkCounter > 0) {
			this.blinkCounter--;
			if(this.blinkCounter > 0) if(this.blinkCounter % 4 > 1) this.alpha = 1; else this.alpha = 0; else {
				this.setModeExplosion();
				return;
			}
		}
	}
	,doActionExplosion: function() {
		var _g1 = 0;
		var _g = com.isartdigital.game.level.Destructible.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!com.isartdigital.game.level.Destructible.list[i].visible) continue;
			if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.level.Destructible.list[i].box,this.box.getChildByName("mcRange"))) com.isartdigital.game.level.Destructible.list[i].destroy();
		}
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcRange"))) com.isartdigital.game.sprites.Player.getInstance().die();
		this.destroy();
	}
	,__class__: com.isartdigital.game.sprites.enemies.EnemyBomb
});
com.isartdigital.game.sprites.enemies.EnemyFire = function() {
	com.isartdigital.game.sprites.enemies.Enemy.call(this);
	this.setModeNormal();
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.shootCounter = 45;
	this.life = 2;
};
com.isartdigital.game.sprites.enemies.EnemyFire.__name__ = ["com","isartdigital","game","sprites","enemies","EnemyFire"];
com.isartdigital.game.sprites.enemies.EnemyFire.__super__ = com.isartdigital.game.sprites.enemies.Enemy;
com.isartdigital.game.sprites.enemies.EnemyFire.prototype = $extend(com.isartdigital.game.sprites.enemies.Enemy.prototype,{
	doActionNormal: function() {
		com.isartdigital.game.sprites.enemies.Enemy.prototype.doActionNormal.call(this);
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcView"))) this.setModeWalk();
	}
	,doActionWalk: function() {
		com.isartdigital.game.sprites.enemies.Enemy.prototype.doActionWalk.call(this);
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcView")) && this.shootCounter <= 0) this.shoot(this.scale.x > 0.0?0.0:180.0 * com.isartdigital.game.sprites.enemies.EnemyFire.TO_RADIAN); else if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcView")) && this.shootCounter > 0) this.shootCounter--;
	}
	,__class__: com.isartdigital.game.sprites.enemies.EnemyFire
});
com.isartdigital.game.sprites.enemies.EnemySpeed = function() {
	com.isartdigital.game.sprites.enemies.Enemy.call(this);
	this.setModeNormal();
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.enemySpeed = 20;
	this.life = 1;
};
com.isartdigital.game.sprites.enemies.EnemySpeed.__name__ = ["com","isartdigital","game","sprites","enemies","EnemySpeed"];
com.isartdigital.game.sprites.enemies.EnemySpeed.__super__ = com.isartdigital.game.sprites.enemies.Enemy;
com.isartdigital.game.sprites.enemies.EnemySpeed.prototype = $extend(com.isartdigital.game.sprites.enemies.Enemy.prototype,{
	doActionNormal: function() {
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcView"))) this.setModeWalk();
	}
	,__class__: com.isartdigital.game.sprites.enemies.EnemySpeed
});
com.isartdigital.game.sprites.enemies.EnemyTurret = function() {
	com.isartdigital.game.sprites.enemies.Enemy.call(this);
	this.setModeNormal();
	this.boxType = com.isartdigital.utils.game.BoxType.SIMPLE;
	this.shootCounter = 50;
	this.life = 0;
};
com.isartdigital.game.sprites.enemies.EnemyTurret.__name__ = ["com","isartdigital","game","sprites","enemies","EnemyTurret"];
com.isartdigital.game.sprites.enemies.EnemyTurret.__super__ = com.isartdigital.game.sprites.enemies.Enemy;
com.isartdigital.game.sprites.enemies.EnemyTurret.prototype = $extend(com.isartdigital.game.sprites.enemies.Enemy.prototype,{
	doActionNormal: function() {
		com.isartdigital.game.sprites.enemies.Enemy.prototype.doActionNormal.call(this);
		if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcView")) && this.shootCounter <= 0) this.shoot(Math.atan2(com.isartdigital.game.sprites.Player.getInstance().y - this.y,com.isartdigital.game.sprites.Player.getInstance().x - this.x)); else if(com.isartdigital.utils.game.CollisionManager.hitTestObject(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),this.box.getChildByName("mcView")) && this.shootCounter > 0) this.shootCounter--;
	}
	,shoot: function(pRotation) {
		var lShoot = new com.isartdigital.game.sprites.shoots.TurretShoot(pRotation,"EnemyTurret");
		com.isartdigital.game.GamePlane.getInstance().addChild(lShoot);
		var lPos = com.isartdigital.game.GamePlane.getInstance().toLocal(this.toGlobal(this.box.getChildByName("mcGun").position));
		lShoot.position.set(lPos.x,lPos.y);
		this.shootCounter = 80;
	}
	,__class__: com.isartdigital.game.sprites.enemies.EnemyTurret
});
com.isartdigital.game.sprites.shoots = {};
com.isartdigital.game.sprites.shoots.Shoot = function() {
	this.speed = 50.0;
	this.shootCounter = 0;
	this.canPassThroughWall = false;
	this.canKillPlayer = false;
	this.canKillEnemies = false;
	this.canDestroyDestructibles = false;
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.NONE;
	this.setModeNormal();
	com.isartdigital.game.sprites.shoots.Shoot.list.push(this);
};
com.isartdigital.game.sprites.shoots.Shoot.__name__ = ["com","isartdigital","game","sprites","shoots","Shoot"];
com.isartdigital.game.sprites.shoots.Shoot.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.game.sprites.shoots.Shoot.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	doActionNormal: function() {
		this.x += Math.cos(this.rotation) * this.speed;
		this.y += Math.sin(this.rotation) * this.speed;
		this.shootCounter++;
		if(this.shootCounter >= 80) this.destroy();
		if(this.canKillPlayer) this.collisionsWithPlayer();
		if(this.canKillEnemies) this.collisionsWithEnemies();
		if(!this.canPassThroughWall) {
			if(this.canDestroyDestructibles) this.suppressDestructibles();
			this.collisionsWithWalls();
			this.collisionsWithPlatforms();
			this.collisionsWithKillzones();
			this.collisionsDestructibles();
		}
	}
	,collisionsWithWalls: function() {
		var pos = this.toGlobal(new PIXI.Point(0,0));
		var _g1 = 0;
		var _g = com.isartdigital.game.level.Wall.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.level.Wall.list[i].get_hitBox(),pos)) {
				this.destroy();
				return;
			}
		}
	}
	,collisionsWithPlatforms: function() {
		var pos = this.toGlobal(new PIXI.Point(0,0));
		var _g1 = 0;
		var _g = com.isartdigital.game.level.Platform.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.level.Platform.list[i].get_hitBox(),pos)) {
				this.destroy();
				return;
			}
		}
	}
	,collisionsWithKillzones: function() {
		var pos = this.toGlobal(new PIXI.Point(0,0));
		var _g1 = 0;
		var _g = com.isartdigital.game.level.KillZone.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.level.KillZone.list[i].get_hitBox(),pos)) {
				this.destroy();
				return;
			}
		}
	}
	,suppressDestructibles: function() {
		var pos = this.toGlobal(new PIXI.Point(0,0));
		var _g1 = 0;
		var _g = com.isartdigital.game.level.Destructible.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.level.Destructible.list[i].get_hitBox(),pos)) {
				com.isartdigital.game.level.Destructible.list[i].destroy();
				this.destroy();
				return;
			}
		}
	}
	,collisionsDestructibles: function() {
		var pos = this.toGlobal(new PIXI.Point(0,0));
		var _g1 = 0;
		var _g = com.isartdigital.game.level.Destructible.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.level.Destructible.list[i].get_hitBox(),pos)) {
				this.destroy();
				return;
			}
		}
	}
	,collisionsWithEnemies: function() {
		var pos = this.toGlobal(new PIXI.Point(0,0));
		var _g1 = 0;
		var _g = com.isartdigital.game.sprites.enemies.Enemy.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(com.isartdigital.game.sprites.enemies.Enemy.list[i].canBeKilled) {
				if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.sprites.enemies.Enemy.list[i].box.getChildByName("mcBody"),pos)) {
					if(com.isartdigital.game.sprites.enemies.Enemy.list[i].life == 0) {
						com.isartdigital.game.sprites.enemies.Enemy.list[i].setModeDead();
						this.destroy();
						return;
					} else {
						com.isartdigital.game.sprites.enemies.Enemy.list[i].life--;
						com.isartdigital.game.sprites.enemies.Enemy.list[i].setModeWalk();
						this.destroy();
						return;
					}
				}
			}
		}
	}
	,collisionsWithPlayer: function() {
		var pos = this.toGlobal(new PIXI.Point(0,0));
		if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(com.isartdigital.game.sprites.Player.getInstance().get_hitBox(),pos)) {
			com.isartdigital.game.sprites.Player.getInstance().die();
			this.destroy();
			return;
		}
	}
	,destroy: function() {
		this.setModeVoid();
		HxOverrides.remove(com.isartdigital.game.sprites.shoots.Shoot.list,this);
		com.isartdigital.utils.game.StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.game.sprites.shoots.Shoot
});
com.isartdigital.game.sprites.shoots.EnemyShoot = function(pRotation,enemyType) {
	this.assetName = "Shoot" + enemyType;
	com.isartdigital.game.sprites.shoots.Shoot.call(this);
	this.setState("begin");
	this.rotation = pRotation;
	this.canKillPlayer = true;
};
com.isartdigital.game.sprites.shoots.EnemyShoot.__name__ = ["com","isartdigital","game","sprites","shoots","EnemyShoot"];
com.isartdigital.game.sprites.shoots.EnemyShoot.__super__ = com.isartdigital.game.sprites.shoots.Shoot;
com.isartdigital.game.sprites.shoots.EnemyShoot.prototype = $extend(com.isartdigital.game.sprites.shoots.Shoot.prototype,{
	__class__: com.isartdigital.game.sprites.shoots.EnemyShoot
});
com.isartdigital.game.sprites.shoots.SimpleShoot = function(pRotation) {
	if(this.assetName == null) this.assetName = "SimpleShootPlayer";
	com.isartdigital.game.sprites.shoots.Shoot.call(this);
	this.setState("begin");
	this.rotation = pRotation;
	this.canKillEnemies = true;
};
com.isartdigital.game.sprites.shoots.SimpleShoot.__name__ = ["com","isartdigital","game","sprites","shoots","SimpleShoot"];
com.isartdigital.game.sprites.shoots.SimpleShoot.__super__ = com.isartdigital.game.sprites.shoots.Shoot;
com.isartdigital.game.sprites.shoots.SimpleShoot.prototype = $extend(com.isartdigital.game.sprites.shoots.Shoot.prototype,{
	__class__: com.isartdigital.game.sprites.shoots.SimpleShoot
});
com.isartdigital.game.sprites.shoots.SuperShoot = function(pRotation) {
	this.assetName = "SuperShootPlayer";
	com.isartdigital.game.sprites.shoots.SimpleShoot.call(this,pRotation);
	this.setState("begin");
	this.rotation = pRotation;
	this.canDestroyDestructibles = true;
};
com.isartdigital.game.sprites.shoots.SuperShoot.__name__ = ["com","isartdigital","game","sprites","shoots","SuperShoot"];
com.isartdigital.game.sprites.shoots.SuperShoot.__super__ = com.isartdigital.game.sprites.shoots.SimpleShoot;
com.isartdigital.game.sprites.shoots.SuperShoot.prototype = $extend(com.isartdigital.game.sprites.shoots.SimpleShoot.prototype,{
	__class__: com.isartdigital.game.sprites.shoots.SuperShoot
});
com.isartdigital.game.sprites.shoots.TurretShoot = function(pRotation,enemyType) {
	com.isartdigital.game.sprites.shoots.EnemyShoot.call(this,pRotation,enemyType);
	this.setState("begin");
	this.rotation = pRotation;
	this.canPassThroughWall = true;
};
com.isartdigital.game.sprites.shoots.TurretShoot.__name__ = ["com","isartdigital","game","sprites","shoots","TurretShoot"];
com.isartdigital.game.sprites.shoots.TurretShoot.__super__ = com.isartdigital.game.sprites.shoots.EnemyShoot;
com.isartdigital.game.sprites.shoots.TurretShoot.prototype = $extend(com.isartdigital.game.sprites.shoots.EnemyShoot.prototype,{
	__class__: com.isartdigital.game.sprites.shoots.TurretShoot
});
com.isartdigital.ui = {};
com.isartdigital.ui.CheatPanel = function() {
	this.init();
};
com.isartdigital.ui.CheatPanel.__name__ = ["com","isartdigital","ui","CheatPanel"];
com.isartdigital.ui.CheatPanel.getInstance = function() {
	if(com.isartdigital.ui.CheatPanel.instance == null) com.isartdigital.ui.CheatPanel.instance = new com.isartdigital.ui.CheatPanel();
	return com.isartdigital.ui.CheatPanel.instance;
};
com.isartdigital.ui.CheatPanel.prototype = {
	init: function() {
		if(com.isartdigital.utils.Config.get_debug() && com.isartdigital.utils.Config.get_data().cheat) this.gui = new dat.gui.GUI();
	}
	,ingame: function() {
		if(this.gui == null) return;
		var lPlayer = this.gui.addFolder("Player");
		lPlayer.open();
		lPlayer.add(com.isartdigital.game.sprites.Player.getInstance(),"godMode").listen();
		var lPlayerPowerUps = lPlayer.addFolder("Player PowerUps");
		lPlayerPowerUps.open();
		lPlayerPowerUps.add(com.isartdigital.game.sprites.Player.getInstance(),"haveSuperShoot").listen();
		lPlayerPowerUps.add(com.isartdigital.game.sprites.Player.getInstance(),"shieldUnlocked").listen();
		lPlayerPowerUps.add(com.isartdigital.game.sprites.Player.getInstance(),"haveDoubleJump").listen();
		this.trail = new com.isartdigital.utils.effects.Trail(com.isartdigital.game.sprites.Player.getInstance(),0,0);
	}
	,clear: function() {
		if(this.gui == null) return;
		this.gui.destroy();
		this.trail.destroy();
		this.trail = null;
		this.init();
	}
	,destroy: function() {
		com.isartdigital.ui.CheatPanel.instance = null;
	}
	,__class__: com.isartdigital.ui.CheatPanel
};
com.isartdigital.utils.ui = {};
com.isartdigital.utils.ui.UIComponent = function() {
	this.modalImage = "assets/alpha_bg.png";
	this._modal = true;
	pixi.display.DisplayObjectContainer.call(this);
};
com.isartdigital.utils.ui.UIComponent.__name__ = ["com","isartdigital","utils","ui","UIComponent"];
com.isartdigital.utils.ui.UIComponent.__super__ = pixi.display.DisplayObjectContainer;
com.isartdigital.utils.ui.UIComponent.prototype = $extend(pixi.display.DisplayObjectContainer.prototype,{
	open: function() {
		if(this.isOpened) return;
		this.isOpened = true;
		this.set_modal(this._modal);
		com.isartdigital.utils.game.GameStage.getInstance().addEventListener("GameStageEvent.RESIZE",$bind(this,this.onResize));
		this.onResize();
	}
	,get_modal: function() {
		return this._modal;
	}
	,set_modal: function(pModal) {
		this._modal = pModal;
		if(this._modal) {
			if(this.modalZone == null) {
				this.modalZone = new PIXI.Sprite(PIXI.Texture.fromImage(this.modalImage));
				this.modalZone.interactive = true;
				this.modalZone.click = this.modalZone.tap = $bind(this,this.stopPropagation);
			}
			if(this.parent != null) this.parent.addChildAt(this.modalZone,this.parent.getChildIndex(this));
		} else if(this.modalZone != null) {
			if(this.modalZone.parent != null) this.modalZone.parent.removeChild(this.modalZone);
			this.modalZone = null;
		}
		return this._modal;
	}
	,stopPropagation: function(pEvent) {
	}
	,close: function() {
		if(!this.isOpened) return;
		this.isOpened = false;
		this.set_modal(false);
		this.destroy();
	}
	,onResize: function(pEvent) {
		if(this.get_modal()) com.isartdigital.utils.ui.UIPosition.setPosition(this.modalZone,"fitScreen");
	}
	,destroy: function() {
		this.close();
	}
	,__class__: com.isartdigital.utils.ui.UIComponent
});
com.isartdigital.utils.ui.Screen = function() {
	com.isartdigital.utils.ui.UIComponent.call(this);
	this.modalImage = "assets/black_bg.png";
};
com.isartdigital.utils.ui.Screen.__name__ = ["com","isartdigital","utils","ui","Screen"];
com.isartdigital.utils.ui.Screen.__super__ = com.isartdigital.utils.ui.UIComponent;
com.isartdigital.utils.ui.Screen.prototype = $extend(com.isartdigital.utils.ui.UIComponent.prototype,{
	__class__: com.isartdigital.utils.ui.Screen
});
com.isartdigital.ui.GraphicLoader = function() {
	com.isartdigital.utils.ui.Screen.call(this);
	var lBg = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "preload_bg.png"));
	lBg.anchor.set(0.5,0.5);
	this.addChild(lBg);
	this.loaderBar = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "preload.png"));
	this.loaderBar.anchor.y = 0.5;
	this.loaderBar.x = -this.loaderBar.width / 2;
	this.addChild(this.loaderBar);
	this.loaderBar.scale.x = 0;
};
com.isartdigital.ui.GraphicLoader.__name__ = ["com","isartdigital","ui","GraphicLoader"];
com.isartdigital.ui.GraphicLoader.getInstance = function() {
	if(com.isartdigital.ui.GraphicLoader.instance == null) com.isartdigital.ui.GraphicLoader.instance = new com.isartdigital.ui.GraphicLoader();
	return com.isartdigital.ui.GraphicLoader.instance;
};
com.isartdigital.ui.GraphicLoader.__super__ = com.isartdigital.utils.ui.Screen;
com.isartdigital.ui.GraphicLoader.prototype = $extend(com.isartdigital.utils.ui.Screen.prototype,{
	update: function(pProgress) {
		this.loaderBar.scale.x = pProgress;
	}
	,destroy: function() {
		com.isartdigital.ui.GraphicLoader.instance = null;
		com.isartdigital.utils.ui.Screen.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.GraphicLoader
});
com.isartdigital.ui.UIManager = function() {
	this.popins = [];
};
com.isartdigital.ui.UIManager.__name__ = ["com","isartdigital","ui","UIManager"];
com.isartdigital.ui.UIManager.getInstance = function() {
	if(com.isartdigital.ui.UIManager.instance == null) com.isartdigital.ui.UIManager.instance = new com.isartdigital.ui.UIManager();
	return com.isartdigital.ui.UIManager.instance;
};
com.isartdigital.ui.UIManager.prototype = {
	openScreen: function(pScreen) {
		this.closeScreens();
		com.isartdigital.utils.game.GameStage.getInstance().getScreensContainer().addChild(pScreen);
		pScreen.open();
	}
	,closeScreens: function() {
		var lContainer = com.isartdigital.utils.game.GameStage.getInstance().getScreensContainer();
		while(lContainer.children.length > 0) {
			var lCurrent;
			lCurrent = js.Boot.__cast(lContainer.getChildAt(lContainer.children.length - 1) , com.isartdigital.utils.ui.Screen);
			lContainer.removeChild(lCurrent);
			lCurrent.close();
		}
	}
	,openPopin: function(pPopin) {
		this.popins.push(pPopin);
		com.isartdigital.utils.game.GameStage.getInstance().getPopinsContainer().addChild(pPopin);
		pPopin.open();
		return true;
	}
	,closeCurrentPopin: function() {
		if(this.popins.length == 0) return;
		var lCurrent = this.popins.pop();
		com.isartdigital.utils.game.GameStage.getInstance().getPopinsContainer().removeChild(lCurrent);
		lCurrent.close();
	}
	,openHud: function() {
		com.isartdigital.utils.game.GameStage.getInstance().getHudContainer().addChild(com.isartdigital.ui.hud.Hud.getInstance());
		com.isartdigital.ui.hud.Hud.getInstance().open();
	}
	,closeHud: function() {
		com.isartdigital.utils.game.GameStage.getInstance().getHudContainer().removeChild(com.isartdigital.ui.hud.Hud.getInstance());
		com.isartdigital.ui.hud.Hud.getInstance().close();
	}
	,startGame: function() {
		this.closeScreens();
		this.openHud();
	}
	,destroy: function() {
		com.isartdigital.ui.UIManager.instance = null;
	}
	,__class__: com.isartdigital.ui.UIManager
};
com.isartdigital.ui.hud = {};
com.isartdigital.ui.hud.Hud = function() {
	this.isBtnShootPressed = false;
	this.isBtnJumpPressed = false;
	this.isBtnRightPressed = false;
	this.isBtnLeftPressed = false;
	com.isartdigital.utils.ui.Screen.call(this);
	this._modal = false;
};
com.isartdigital.ui.hud.Hud.__name__ = ["com","isartdigital","ui","hud","Hud"];
com.isartdigital.ui.hud.Hud.getInstance = function() {
	if(com.isartdigital.ui.hud.Hud.instance == null) com.isartdigital.ui.hud.Hud.instance = new com.isartdigital.ui.hud.Hud();
	return com.isartdigital.ui.hud.Hud.instance;
};
com.isartdigital.ui.hud.Hud.__super__ = com.isartdigital.utils.ui.Screen;
com.isartdigital.ui.hud.Hud.prototype = $extend(com.isartdigital.utils.ui.Screen.prototype,{
	createVirtualButtons: function() {
		var _g = this;
		this.btnLeft = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "btnLeft.png"));
		this.btnLeft.anchor.set(-0.1,2.1);
		this.addChild(this.btnLeft);
		this.btnLeft.alpha = 0.6;
		this.btnLeft.interactive = true;
		this.btnLeft.buttonMode = true;
		this.btnLeft.touchstart = function(pData) {
			_g.isBtnLeftPressed = true;
			_g.btnLeft.alpha = 1;
		};
		this.btnLeft.touchend = this.btnLeft.touchendoutside = function(pData1) {
			_g.isBtnLeftPressed = false;
			_g.btnLeft.alpha = 0.6;
		};
		this.btnRight = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "btnRight.png"));
		this.btnRight.anchor.set(-1.1,1.1);
		this.addChild(this.btnRight);
		this.btnRight.alpha = 0.6;
		this.btnRight.interactive = true;
		this.btnRight.buttonMode = true;
		this.btnRight.touchstart = function(pData2) {
			_g.isBtnRightPressed = true;
			_g.btnRight.alpha = 1;
		};
		this.btnRight.touchend = this.btnRight.touchendoutside = function(pData3) {
			_g.isBtnRightPressed = false;
			_g.btnRight.alpha = 0.6;
		};
		this.btnJump = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "btnJump.png"));
		this.btnJump.anchor.set(2.1,1.1);
		this.addChild(this.btnJump);
		this.btnJump.alpha = 0.6;
		this.btnJump.interactive = true;
		this.btnJump.buttonMode = true;
		this.btnJump.touchstart = function(pData4) {
			_g.isBtnJumpPressed = true;
			_g.btnJump.alpha = 1;
		};
		this.btnJump.touchend = this.btnJump.touchendoutside = function(pData5) {
			_g.isBtnJumpPressed = false;
			_g.btnJump.alpha = 0.6;
		};
		this.btnShoot = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "btnShoot.png"));
		this.btnShoot.anchor.set(1.1,2.1);
		this.addChild(this.btnShoot);
		this.btnShoot.alpha = 0.6;
		this.btnShoot.interactive = true;
		this.btnShoot.buttonMode = true;
		this.btnShoot.touchstart = function(pData6) {
			_g.isBtnShootPressed = true;
			_g.btnShoot.alpha = 1;
		};
		this.btnShoot.touchend = this.btnShoot.touchendoutside = function(pData7) {
			_g.isBtnShootPressed = false;
			_g.btnShoot.alpha = 0.6;
		};
	}
	,onResize: function(pEvent) {
		if(this.btnLeft == null) return;
		com.isartdigital.utils.ui.UIPosition.setPosition(this.btnLeft,"bottomLeft");
		com.isartdigital.utils.ui.UIPosition.setPosition(this.btnRight,"bottomLeft");
		com.isartdigital.utils.ui.UIPosition.setPosition(this.btnShoot,"bottomRight");
		com.isartdigital.utils.ui.UIPosition.setPosition(this.btnJump,"bottomRight");
	}
	,destroy: function() {
		com.isartdigital.ui.hud.Hud.instance = null;
		com.isartdigital.utils.ui.Screen.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.hud.Hud
});
com.isartdigital.utils.ui.Popin = function() {
	com.isartdigital.utils.ui.UIComponent.call(this);
};
com.isartdigital.utils.ui.Popin.__name__ = ["com","isartdigital","utils","ui","Popin"];
com.isartdigital.utils.ui.Popin.__super__ = com.isartdigital.utils.ui.UIComponent;
com.isartdigital.utils.ui.Popin.prototype = $extend(com.isartdigital.utils.ui.UIComponent.prototype,{
	__class__: com.isartdigital.utils.ui.Popin
});
com.isartdigital.ui.popin = {};
com.isartdigital.ui.popin.EndLevelScreen = function() {
	com.isartdigital.utils.ui.Popin.call(this);
	this.background = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "alpha_bg.png"));
	this.background.anchor.set(0.5,0.5);
	this.background.scale.set(200.0,200.0);
	this.addChild(this.background);
	this.popup = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "Popup.png"));
	this.popup.anchor.set(0.5,0.5);
	this.addChild(this.popup);
	this.text = new PIXI.Text("Niveau terminé !",{ font : "120px Impact", fill : "#FF6700", align : "center"});
	this.text.anchor.set(0.5,0.5);
	this.text.position.y -= 200;
	this.addChild(this.text);
	this.score = new PIXI.Text("Energie ramassée : n/a sur n/a",{ font : "70px Impact", fill : "#CCCCCC", align : "center"});
	this.score.anchor.set(0.5,0.5);
	this.score.position.y += 100;
	this.addChild(this.score);
	this.scoreBonusText = new PIXI.Text("Bravo !",{ font : "90px Impact", fill : "#CCCCCC", align : "center"});
	this.scoreBonusText.anchor.set(0.5,0.5);
	this.scoreBonusText.position.y += 200;
	this.addChild(this.scoreBonusText);
	this.scoreBonusText.visible = false;
	this.playerPowerUpText = new PIXI.Text("Bravo, maintnant achète le DLC !",{ font : "40px Impact", fill : "#CCCCCC", align : "center"});
	this.playerPowerUpText.anchor.set(0.5,0.5);
	this.playerPowerUpText.position.y += 300;
	this.addChild(this.playerPowerUpText);
	this.playerPowerUpText.visible = false;
	this.clickToNext = new PIXI.Text("Toucher ou cliquer pour revenir au menu",{ font : "70px Impact", fill : "#CCCCCC", align : "center"});
	this.clickToNext.anchor.set(0.5,0.5);
	this.clickToNext.position.y += 400;
	this.addChild(this.clickToNext);
	this.interactive = true;
	this.buttonMode = true;
	this.click = this.tap = $bind(this,this.onClick);
};
com.isartdigital.ui.popin.EndLevelScreen.__name__ = ["com","isartdigital","ui","popin","EndLevelScreen"];
com.isartdigital.ui.popin.EndLevelScreen.getInstance = function() {
	if(com.isartdigital.ui.popin.EndLevelScreen.instance == null) com.isartdigital.ui.popin.EndLevelScreen.instance = new com.isartdigital.ui.popin.EndLevelScreen();
	return com.isartdigital.ui.popin.EndLevelScreen.instance;
};
com.isartdigital.ui.popin.EndLevelScreen.__super__ = com.isartdigital.utils.ui.Popin;
com.isartdigital.ui.popin.EndLevelScreen.prototype = $extend(com.isartdigital.utils.ui.Popin.prototype,{
	setCollectableNumber: function(collected,total) {
		var string = "Energie ramassée : " + collected + " sur " + total;
		this.score.setText(string);
		this.scoreBonusText.visible = collected >= total;
		string = "Bravo, tu as débloqué : ";
		this.playerPowerUpText.visible = false;
		var _g = com.isartdigital.ui.screens.LevelSelect.currentLevel;
		switch(_g) {
		case 1:
			if(!com.isartdigital.game.sprites.Player.getInstance().hasShield) {
				string += "Le bouclier (activable en ramassant de l'énergie)";
				this.playerPowerUpText.visible = true;
			}
			break;
		case 2:
			if(!com.isartdigital.game.sprites.Player.getInstance().haveDoubleJump) {
				string += "Le double saut";
				this.playerPowerUpText.visible = true;
			}
			break;
		case 3:
			if(!com.isartdigital.game.sprites.Player.getInstance().haveSuperShoot) {
				string += "Le super tir (utilisable en pressant longuement le bouton de tir)";
				this.playerPowerUpText.visible = true;
			}
			break;
		default:
			return;
		}
		this.playerPowerUpText.setText(string);
	}
	,onClick: function(pData) {
		com.isartdigital.utils.sounds.SoundManager.getSound("click").play();
		com.isartdigital.ui.UIManager.getInstance().closeCurrentPopin();
		com.isartdigital.ui.UIManager.getInstance().openScreen(com.isartdigital.ui.screens.LevelSelect.getInstance());
		var _g = com.isartdigital.ui.screens.LevelSelect.currentLevel;
		switch(_g) {
		case 1:
			com.isartdigital.game.sprites.Player.getInstance().hasShield = true;
			break;
		case 2:
			com.isartdigital.game.sprites.Player.getInstance().haveDoubleJump = true;
			break;
		case 3:
			com.isartdigital.game.sprites.Player.getInstance().haveSuperShoot = true;
			break;
		default:
			return;
		}
	}
	,destroy: function() {
		com.isartdigital.ui.popin.EndLevelScreen.instance = null;
		com.isartdigital.utils.ui.Popin.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.popin.EndLevelScreen
});
com.isartdigital.ui.popin.Loading = function() {
	com.isartdigital.utils.ui.Popin.call(this);
	this.background = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "Loading.png"));
	this.background.anchor.set(0.5,0.5);
	this.addChild(this.background);
};
com.isartdigital.ui.popin.Loading.__name__ = ["com","isartdigital","ui","popin","Loading"];
com.isartdigital.ui.popin.Loading.getInstance = function() {
	if(com.isartdigital.ui.popin.Loading.instance == null) com.isartdigital.ui.popin.Loading.instance = new com.isartdigital.ui.popin.Loading();
	return com.isartdigital.ui.popin.Loading.instance;
};
com.isartdigital.ui.popin.Loading.__super__ = com.isartdigital.utils.ui.Popin;
com.isartdigital.ui.popin.Loading.prototype = $extend(com.isartdigital.utils.ui.Popin.prototype,{
	destroy: function() {
		com.isartdigital.ui.popin.Loading.instance = null;
		com.isartdigital.utils.ui.Popin.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.popin.Loading
});
com.isartdigital.ui.popin.Pause = function() {
	com.isartdigital.utils.ui.Popin.call(this);
	this.background = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "Pause.png"));
	this.background.anchor.set(0.5,0.5);
	this.addChild(this.background);
	this.interactive = true;
	this.buttonMode = true;
	this.click = this.tap = $bind(this,this.onClick);
};
com.isartdigital.ui.popin.Pause.__name__ = ["com","isartdigital","ui","popin","Pause"];
com.isartdigital.ui.popin.Pause.getInstance = function() {
	if(com.isartdigital.ui.popin.Pause.instance == null) com.isartdigital.ui.popin.Pause.instance = new com.isartdigital.ui.popin.Pause();
	return com.isartdigital.ui.popin.Pause.instance;
};
com.isartdigital.ui.popin.Pause.__super__ = com.isartdigital.utils.ui.Popin;
com.isartdigital.ui.popin.Pause.prototype = $extend(com.isartdigital.utils.ui.Popin.prototype,{
	onClick: function(pData) {
		com.isartdigital.utils.sounds.SoundManager.getSound("click").play();
		com.isartdigital.ui.UIManager.getInstance().closeCurrentPopin();
	}
	,destroy: function() {
		com.isartdigital.ui.popin.Pause.instance = null;
		com.isartdigital.utils.ui.Popin.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.popin.Pause
});
com.isartdigital.utils.ui.Button = function() {
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.SELF;
	this.interactive = true;
	this.buttonMode = true;
	this.onMouseOver = $bind(this,this._mouseVoid);
	this.onMouseDown = $bind(this,this._mouseVoid);
	this.onClick = $bind(this,this._mouseVoid);
	this.onMouseOut = $bind(this,this._mouseVoid);
	this.onTap = $bind(this,this._mouseVoid);
	this.tap = $bind(this,this._tap);
	this.click = $bind(this,this._click);
	this.mousedown = $bind(this,this._mouseDown);
	this.mouseover = $bind(this,this._mouseOver);
	this.mouseupoutside = this.mouseout = $bind(this,this._mouseOut);
	this.initStyle();
	this.txt = new PIXI.Text("",this.upStyle);
	this.txt.anchor.set(0.5,0.5);
	this.start();
};
com.isartdigital.utils.ui.Button.__name__ = ["com","isartdigital","utils","ui","Button"];
com.isartdigital.utils.ui.Button.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.utils.ui.Button.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	initStyle: function() {
		this.upStyle = { font : "80px New Athletic M54", fill : "#000000", align : "center"};
		this.overStyle = { font : "80px New Athletic M54", fill : "#AAAAAA", align : "center"};
		this.downStyle = { font : "80px New Athletic M54", fill : "#FFFFFF", align : "center"};
	}
	,setText: function(pText) {
		this.txt.setText(pText);
	}
	,setModeNormal: function() {
		this.setState(this.DEFAULT_STATE);
		this.anim.anchor.set(0.5,0.5);
		this.anim.gotoAndStop(0);
		this.addChild(this.txt);
		com.isartdigital.utils.game.StateGraphic.prototype.setModeNormal.call(this);
	}
	,_mouseVoid: function() {
	}
	,_tap: function(pEvent) {
		this.anim.gotoAndStop(0);
		this.txt.setStyle(this.upStyle);
		this.onTap(pEvent);
	}
	,_click: function(pEvent) {
		this.anim.gotoAndStop(0);
		this.txt.setStyle(this.upStyle);
		this.onClick(pEvent);
	}
	,_mouseDown: function(pEvent) {
		this.anim.gotoAndStop(2);
		this.txt.setStyle(this.downStyle);
		this.onMouseDown(pEvent);
	}
	,_mouseOver: function(pEvent) {
		this.anim.gotoAndStop(1);
		this.txt.setStyle(this.overStyle);
		this.onMouseOver(pEvent);
	}
	,_mouseOut: function(pEvent) {
		this.anim.gotoAndStop(0);
		this.txt.setStyle(this.upStyle);
		this.onMouseOut(pEvent);
	}
	,__class__: com.isartdigital.utils.ui.Button
});
com.isartdigital.ui.screens = {};
com.isartdigital.ui.screens.ButtonOk = function() {
	com.isartdigital.utils.ui.Button.call(this);
	this.setText("Jouer");
};
com.isartdigital.ui.screens.ButtonOk.__name__ = ["com","isartdigital","ui","screens","ButtonOk"];
com.isartdigital.ui.screens.ButtonOk.__super__ = com.isartdigital.utils.ui.Button;
com.isartdigital.ui.screens.ButtonOk.prototype = $extend(com.isartdigital.utils.ui.Button.prototype,{
	initStyle: function() {
		this.upStyle = { font : "120px Impact", fill : "#FF6700", align : "center"};
		this.overStyle = { font : "120px Impact", fill : "#FF9900", align : "center"};
		this.downStyle = { font : "120px Impact", fill : "#FF9900", align : "center"};
	}
	,__class__: com.isartdigital.ui.screens.ButtonOk
});
com.isartdigital.ui.screens.Intro = function() {
	com.isartdigital.utils.ui.Screen.call(this);
	this.background = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "Intro_bg.png"));
	this.background.anchor.set(0.5,0.5);
	this.addChild(this.background);
	if(com.isartdigital.utils.Config.get_skipIntro()) haxe.Timer.delay(function() {
		com.isartdigital.ui.UIManager.getInstance().openScreen(com.isartdigital.ui.screens.TitleCard.getInstance());
	},15); else haxe.Timer.delay(function() {
		com.isartdigital.ui.UIManager.getInstance().openScreen(com.isartdigital.ui.screens.TitleCard.getInstance());
	},com.isartdigital.utils.Config.get_introDelay());
};
com.isartdigital.ui.screens.Intro.__name__ = ["com","isartdigital","ui","screens","Intro"];
com.isartdigital.ui.screens.Intro.getInstance = function() {
	if(com.isartdigital.ui.screens.Intro.instance == null) com.isartdigital.ui.screens.Intro.instance = new com.isartdigital.ui.screens.Intro();
	return com.isartdigital.ui.screens.Intro.instance;
};
com.isartdigital.ui.screens.Intro.__super__ = com.isartdigital.utils.ui.Screen;
com.isartdigital.ui.screens.Intro.prototype = $extend(com.isartdigital.utils.ui.Screen.prototype,{
	destroy: function() {
		com.isartdigital.ui.screens.Intro.instance = null;
		com.isartdigital.utils.ui.Screen.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.screens.Intro
});
com.isartdigital.ui.screens.LevelSelect = function() {
	com.isartdigital.utils.ui.Screen.call(this);
	this.initStyle();
	this.level1 = new com.isartdigital.ui.screens.LevelSelectBtn(1);
	this.level1.setAnchor(0.5,0.5);
	this.addChild(this.level1);
	this.txtLevel1 = new PIXI.Text("Préhistoire",this.upStyle);
	this.txtLevel1.anchor.set(0.5,0.5);
	this.level1.addChild(this.txtLevel1);
	this.scoreLevel1 = new PIXI.Text("Score",this.secondStyle);
	this.scoreLevel1.anchor.set(0.5,0.5);
	this.scoreLevel1.position.y += 100;
	this.level1.addChild(this.scoreLevel1);
	this.scoreLevel1.visible = false;
	this.level2 = new com.isartdigital.ui.screens.LevelSelectBtn(2);
	this.level2.setAnchor(0.5,0.5);
	this.addChild(this.level2);
	this.txtLevel2 = new PIXI.Text("Far West",this.upStyle);
	this.txtLevel2.anchor.set(0.5,0.5);
	this.level2.addChild(this.txtLevel2);
	this.scoreLevel2 = new PIXI.Text("Score",this.secondStyle);
	this.scoreLevel2.anchor.set(0.5,0.5);
	this.scoreLevel2.position.y += 100;
	this.level2.addChild(this.scoreLevel2);
	this.scoreLevel2.visible = false;
	this.level3 = new com.isartdigital.ui.screens.LevelSelectBtn(3);
	this.level3.setAnchor(0.5,0.5);
	this.addChild(this.level3);
	this.txtLevel3 = new PIXI.Text("Temples Mayas",this.upStyle);
	this.txtLevel3.anchor.set(0.5,0.5);
	this.level3.addChild(this.txtLevel3);
	this.scoreLevel3 = new PIXI.Text("Score",this.secondStyle);
	this.scoreLevel3.anchor.set(0.5,0.5);
	this.scoreLevel3.position.y += 100;
	this.level3.addChild(this.scoreLevel3);
	this.scoreLevel3.visible = false;
	this.title = new PIXI.Text("Selection du monde",{ font : "130px Impact", fill : "#404040", align : "center"});
	this.title.anchor.set(0.5,0.5);
	this.addChild(this.title);
	this.title.position.y -= 600;
	var random = Math.round(1 + Math.random() * 2);
	if(random == 1) {
		this.level1.position.set(-this.level2.width,0);
		this.level2.position.set(0,0);
		this.level3.position.set(this.level2.width,0);
	} else if(random == 2) {
		this.level2.position.set(-this.level1.width,0);
		this.level1.position.set(0,0);
		this.level3.position.set(this.level1.width,0);
	} else if(random == 3) {
		this.level3.position.set(-this.level1.width,0);
		this.level1.position.set(0,0);
		this.level2.position.set(this.level1.width,0);
	}
};
com.isartdigital.ui.screens.LevelSelect.__name__ = ["com","isartdigital","ui","screens","LevelSelect"];
com.isartdigital.ui.screens.LevelSelect.getInstance = function() {
	if(com.isartdigital.ui.screens.LevelSelect.instance == null) com.isartdigital.ui.screens.LevelSelect.instance = new com.isartdigital.ui.screens.LevelSelect();
	return com.isartdigital.ui.screens.LevelSelect.instance;
};
com.isartdigital.ui.screens.LevelSelect.__super__ = com.isartdigital.utils.ui.Screen;
com.isartdigital.ui.screens.LevelSelect.prototype = $extend(com.isartdigital.utils.ui.Screen.prototype,{
	initStyle: function() {
		this.upStyle = { font : "100px Impact", fill : "#FFFFFF", align : "center"};
		this.secondStyle = { font : "70px Impact", fill : "#CCCCCC", align : "center"};
	}
	,updateCollectableNumbers: function() {
		this.scoreLevel1.setText("Energie : " + Std.string((function($this) {
			var $r;
			var $int = com.isartdigital.game.GameManager.getInstance().levelCollectables[1];
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this))) + " / " + Std.string((function($this) {
			var $r;
			var int1 = com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[1];
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this))));
		this.scoreLevel1.visible = (function($this) {
			var $r;
			var int2 = com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[1];
			$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
			return $r;
		}(this)) != null;
		this.scoreLevel2.setText("Energie : " + Std.string((function($this) {
			var $r;
			var int3 = com.isartdigital.game.GameManager.getInstance().levelCollectables[2];
			$r = int3 < 0?4294967296.0 + int3:int3 + 0.0;
			return $r;
		}(this))) + " / " + Std.string((function($this) {
			var $r;
			var int4 = com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[2];
			$r = int4 < 0?4294967296.0 + int4:int4 + 0.0;
			return $r;
		}(this))));
		this.scoreLevel2.visible = (function($this) {
			var $r;
			var int5 = com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[2];
			$r = int5 < 0?4294967296.0 + int5:int5 + 0.0;
			return $r;
		}(this)) != null;
		this.scoreLevel3.setText("Energie : " + Std.string((function($this) {
			var $r;
			var int6 = com.isartdigital.game.GameManager.getInstance().levelCollectables[3];
			$r = int6 < 0?4294967296.0 + int6:int6 + 0.0;
			return $r;
		}(this))) + " / " + Std.string((function($this) {
			var $r;
			var int7 = com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[3];
			$r = int7 < 0?4294967296.0 + int7:int7 + 0.0;
			return $r;
		}(this))));
		this.scoreLevel3.visible = (function($this) {
			var $r;
			var int8 = com.isartdigital.game.GameManager.getInstance().maxLevelCollectables[3];
			$r = int8 < 0?4294967296.0 + int8:int8 + 0.0;
			return $r;
		}(this)) != null;
	}
	,loadLevel: function(level) {
		com.isartdigital.ui.screens.LevelSelect.currentLevel = level;
		com.isartdigital.ui.UIManager.getInstance().openPopin(com.isartdigital.ui.popin.Loading.getInstance());
		var lLoader = new com.isartdigital.utils.loader.Loader();
		lLoader.addAssetFile("Level" + Std.string((function($this) {
			var $r;
			var $int = level;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this))) + ".json");
		lLoader.addAssetFile("level" + Std.string((function($this) {
			var $r;
			var int1 = level;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this))) + "_graphics.json");
		lLoader.addAssetFile("anchors_level" + Std.string((function($this) {
			var $r;
			var int2 = level;
			$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
			return $r;
		}(this))) + ".json");
		com.isartdigital.utils.sounds.SoundManager.getSound("click").play();
		lLoader.addEventListener("LoaderEvent.COMPLETE",$bind(this,this.onLoadComplete));
		lLoader.load();
	}
	,onLoadComplete: function(e) {
		e.target.removeEventListener("LoaderEvent.COMPLETE",$bind(this,this.onLoadComplete));
		if(com.isartdigital.game.LevelLoader.getInstance().loadLevel(com.isartdigital.ui.screens.LevelSelect.currentLevel)) {
			com.isartdigital.ui.UIManager.getInstance().closeCurrentPopin();
			com.isartdigital.game.GameManager.getInstance().start();
		}
	}
	,destroy: function() {
		com.isartdigital.ui.screens.LevelSelect.instance = null;
		com.isartdigital.utils.ui.Screen.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.screens.LevelSelect
});
com.isartdigital.ui.screens.LevelSelectBtn = function(pLevel) {
	com.isartdigital.utils.game.StateGraphic.call(this);
	this.boxType = com.isartdigital.utils.game.BoxType.NONE;
	this.setState("" + pLevel);
	this.myLevel = pLevel;
	this.interactive = true;
	this.buttonMode = true;
	this.click = this.tap = $bind(this,this.onClick);
	this.mouseover = $bind(this,this.onHover);
	this.mouseout = $bind(this,this.onHoverExit);
};
com.isartdigital.ui.screens.LevelSelectBtn.__name__ = ["com","isartdigital","ui","screens","LevelSelectBtn"];
com.isartdigital.ui.screens.LevelSelectBtn.__super__ = com.isartdigital.utils.game.StateGraphic;
com.isartdigital.ui.screens.LevelSelectBtn.prototype = $extend(com.isartdigital.utils.game.StateGraphic.prototype,{
	onClick: function(pData) {
		com.isartdigital.ui.screens.LevelSelect.getInstance().loadLevel(this.myLevel);
	}
	,onHover: function(pData) {
		this.alpha = 0.5;
	}
	,onHoverExit: function(pData) {
		this.alpha = 1;
	}
	,setAnchor: function(pX,pY) {
		this.anim.anchor.set(pX,pY);
	}
	,__class__: com.isartdigital.ui.screens.LevelSelectBtn
});
com.isartdigital.ui.screens.TitleCard = function() {
	com.isartdigital.utils.ui.Screen.call(this);
	this.background = new PIXI.Sprite(PIXI.Texture.fromImage(com.isartdigital.utils.Config.get_assetsPath() + "TitleCard_bg.png"));
	this.background.anchor.set(0.5,0.5);
	this.addChild(this.background);
	this.btnOk = new com.isartdigital.ui.screens.ButtonOk();
	this.btnOk.y = 350;
	this.btnOk.onClick = $bind(this,this.onClick);
	this.btnOk.onTap = $bind(this,this.onTap);
	this.addChild(this.btnOk);
};
com.isartdigital.ui.screens.TitleCard.__name__ = ["com","isartdigital","ui","screens","TitleCard"];
com.isartdigital.ui.screens.TitleCard.getInstance = function() {
	if(com.isartdigital.ui.screens.TitleCard.instance == null) com.isartdigital.ui.screens.TitleCard.instance = new com.isartdigital.ui.screens.TitleCard();
	return com.isartdigital.ui.screens.TitleCard.instance;
};
com.isartdigital.ui.screens.TitleCard.__super__ = com.isartdigital.utils.ui.Screen;
com.isartdigital.ui.screens.TitleCard.prototype = $extend(com.isartdigital.utils.ui.Screen.prototype,{
	onTap: function(pData) {
		com.isartdigital.ui.hud.Hud.getInstance().createVirtualButtons();
		this.onClick(pData);
	}
	,onClick: function(pData) {
		com.isartdigital.utils.sounds.SoundManager.getSound("click").play();
		com.isartdigital.ui.UIManager.getInstance().openScreen(com.isartdigital.ui.screens.LevelSelect.getInstance());
	}
	,destroy: function() {
		com.isartdigital.ui.screens.TitleCard.instance = null;
		com.isartdigital.utils.ui.Screen.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.ui.screens.TitleCard
});
com.isartdigital.utils.Config = function() { };
com.isartdigital.utils.Config.__name__ = ["com","isartdigital","utils","Config"];
com.isartdigital.utils.Config.init = function(pConfig) {
	var _g = 0;
	var _g1 = Reflect.fields(pConfig);
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		Reflect.setField(com.isartdigital.utils.Config._data,i,Reflect.field(pConfig,i));
	}
	if(com.isartdigital.utils.Config._data.version == null) com.isartdigital.utils.Config._data.version = "0.0.0";
	if(com.isartdigital.utils.Config._data.language == null) com.isartdigital.utils.Config._data.language = HxOverrides.substr(window.navigator.language,0,2);
	if(com.isartdigital.utils.Config._data.languages == []) com.isartdigital.utils.Config._data.languages.push(com.isartdigital.utils.Config._data.language);
	if(com.isartdigital.utils.Config._data.debug == null) com.isartdigital.utils.Config._data.debug = false;
	if(com.isartdigital.utils.Config._data.fps == null) com.isartdigital.utils.Config._data.fps = false;
	if(com.isartdigital.utils.Config._data.qrcode == null) com.isartdigital.utils.Config._data.qrcode = false;
	if(com.isartdigital.utils.Config._data.langPath == null) com.isartdigital.utils.Config._data.langPath = "";
	if(com.isartdigital.utils.Config._data.assetsPath == null) com.isartdigital.utils.Config._data.assetsPath = "";
	if(com.isartdigital.utils.Config._data.soundsPath == null) com.isartdigital.utils.Config._data.soundsPath = "";
	if(com.isartdigital.utils.Config._data.skipIntro == null) com.isartdigital.utils.Config._data.skipIntro = false;
	if(com.isartdigital.utils.Config._data.introDelay == null) com.isartdigital.utils.Config._data.introDelay = 2000;
};
com.isartdigital.utils.Config.get_data = function() {
	return com.isartdigital.utils.Config._data;
};
com.isartdigital.utils.Config.get_version = function() {
	return com.isartdigital.utils.Config._data.version;
};
com.isartdigital.utils.Config.get_language = function() {
	return com.isartdigital.utils.Config.get_data().language;
};
com.isartdigital.utils.Config.get_languages = function() {
	return com.isartdigital.utils.Config.get_data().languages;
};
com.isartdigital.utils.Config.get_debug = function() {
	return com.isartdigital.utils.Config.get_data().debug;
};
com.isartdigital.utils.Config.get_fps = function() {
	return com.isartdigital.utils.Config.get_data().fps;
};
com.isartdigital.utils.Config.get_qrcode = function() {
	return com.isartdigital.utils.Config.get_data().qrcode;
};
com.isartdigital.utils.Config.get_langPath = function() {
	return com.isartdigital.utils.Config._data.langPath;
};
com.isartdigital.utils.Config.get_assetsPath = function() {
	return com.isartdigital.utils.Config._data.assetsPath;
};
com.isartdigital.utils.Config.get_soundsPath = function() {
	return com.isartdigital.utils.Config._data.soundsPath;
};
com.isartdigital.utils.Config.get_skipIntro = function() {
	return com.isartdigital.utils.Config._data.skipIntro;
};
com.isartdigital.utils.Config.get_introDelay = function() {
	return com.isartdigital.utils.Config._data.introDelay;
};
com.isartdigital.utils.Debug = function() {
};
com.isartdigital.utils.Debug.__name__ = ["com","isartdigital","utils","Debug"];
com.isartdigital.utils.Debug.getInstance = function() {
	if(com.isartdigital.utils.Debug.instance == null) com.isartdigital.utils.Debug.instance = new com.isartdigital.utils.Debug();
	return com.isartdigital.utils.Debug.instance;
};
com.isartdigital.utils.Debug.error = function(pArg) {
	console.error(pArg);
};
com.isartdigital.utils.Debug.warn = function(pArg) {
	console.warn(pArg);
};
com.isartdigital.utils.Debug.table = function(pArg) {
	console.table(pArg);
};
com.isartdigital.utils.Debug.info = function(pArg) {
	console.info(pArg);
};
com.isartdigital.utils.Debug.prototype = {
	init: function(pGameDispatcher) {
		if(com.isartdigital.utils.Config.get_fps()) {
			this.stats = new Stats();
			this.stats.domElement.style.position = "absolute";
			this.stats.domElement.style.left = "0px";
			this.stats.domElement.style.top = "0px";
			window.document.body.appendChild(this.stats.domElement);
			pGameDispatcher.addEventListener("GameEvent.GAME_LOOP",$bind(this,this.updateStats));
		}
		if(com.isartdigital.utils.Config.get_qrcode()) {
			var lQr = new Image();
			lQr.style.position = "absolute";
			lQr.style.right = "0px";
			lQr.style.bottom = "0px";
			var lSize = Std["int"](0.35 * com.isartdigital.utils.system.DeviceCapabilities.getSizeFactor());
			lQr.src = "https://chart.googleapis.com/chart?chs=" + lSize + "x" + lSize + "&cht=qr&chl=" + window.location.href + "&choe=UTF-8";
			window.document.body.appendChild(lQr);
		}
	}
	,updateStats: function(pEvent) {
		this.stats.end();
		this.stats.begin();
	}
	,__class__: com.isartdigital.utils.Debug
};
com.isartdigital.utils.effects = {};
com.isartdigital.utils.effects.Trail = function(pTarget,pFrequency,pPersistence) {
	this.oldPos = new PIXI.Point(0,0);
	this.list = [];
	this.counter = 0;
	com.isartdigital.utils.game.GameObject.call(this);
	this.target = pTarget;
	this.frequency = Math.max(0,Math.min(pFrequency,1)) * 4;
	this.persistence = 0.95 + Math.max(0,Math.min(pPersistence,1)) / 20;
	this.target.parent.addChildAt(this,this.target.parent.getChildIndex(this.target));
	this.start();
};
com.isartdigital.utils.effects.Trail.__name__ = ["com","isartdigital","utils","effects","Trail"];
com.isartdigital.utils.effects.Trail.__super__ = com.isartdigital.utils.game.GameObject;
com.isartdigital.utils.effects.Trail.prototype = $extend(com.isartdigital.utils.game.GameObject.prototype,{
	setModeNormal: function() {
		com.isartdigital.utils.game.GameObject.prototype.setModeNormal.call(this);
		com.isartdigital.Main.getInstance().addEventListener("GameEvent.GAME_LOOP",this.doAction);
	}
	,doActionNormal: function() {
		var _g1 = 0;
		var _g = this.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.list[i].scale.x *= this.persistence;
			this.list[i].scale.y *= this.persistence;
			this.list[i].alpha *= this.persistence;
		}
		if(this.list.length > 0 && this.list[0].scale.x < 0.1) this.removeChild(this.list.shift());
		if((function($this) {
			var $r;
			var a = ++$this.counter;
			$r = (function($this) {
				var $r;
				var $int = a;
				$r = $int < 0?4294967296.0 + $int:$int + 0.0;
				return $r;
			}($this)) > $this.frequency;
			return $r;
		}(this)) && (this.oldPos.x != this.target.x || this.oldPos.y != this.target.y)) {
			var lCircle = new pixi.display.DisplayObjectContainer();
			var lGraph = new PIXI.Graphics();
			lGraph.beginFill(16777215);
			lGraph.drawCircle(0,0,20);
			lGraph.endFill();
			lCircle.position = this.target.position.clone();
			lCircle.addChild(lGraph);
			this.addChild(lCircle);
			this.list.push(lCircle);
			this.counter = 0;
		}
		this.oldPos = this.target.position.clone();
	}
	,destroy: function() {
		com.isartdigital.Main.getInstance().removeEventListener("GameEvent.GAME_LOOP",this.doAction);
		this.target.parent.removeChild(this);
		this.target = null;
		com.isartdigital.utils.game.GameObject.prototype.destroy.call(this);
	}
	,__class__: com.isartdigital.utils.effects.Trail
});
com.isartdigital.utils.events = {};
com.isartdigital.utils.events.EventTarget = function() {
	PIXI.EventTarget.call(this);
};
com.isartdigital.utils.events.EventTarget.__name__ = ["com","isartdigital","utils","events","EventTarget"];
com.isartdigital.utils.events.EventTarget.__super__ = PIXI.EventTarget;
com.isartdigital.utils.events.EventTarget.prototype = $extend(PIXI.EventTarget.prototype,{
	__class__: com.isartdigital.utils.events.EventTarget
});
com.isartdigital.utils.events.GameEvent = function(target,name,data) {
	PIXI.Event.call(this,target,name,data);
};
com.isartdigital.utils.events.GameEvent.__name__ = ["com","isartdigital","utils","events","GameEvent"];
com.isartdigital.utils.events.GameEvent.__super__ = PIXI.Event;
com.isartdigital.utils.events.GameEvent.prototype = $extend(PIXI.Event.prototype,{
	__class__: com.isartdigital.utils.events.GameEvent
});
com.isartdigital.utils.events.GameStageEvent = function(target,name,data) {
	PIXI.Event.call(this,target,name,data);
};
com.isartdigital.utils.events.GameStageEvent.__name__ = ["com","isartdigital","utils","events","GameStageEvent"];
com.isartdigital.utils.events.GameStageEvent.__super__ = PIXI.Event;
com.isartdigital.utils.events.GameStageEvent.prototype = $extend(PIXI.Event.prototype,{
	__class__: com.isartdigital.utils.events.GameStageEvent
});
com.isartdigital.utils.events.LoaderEvent = function(target,name,data) {
	PIXI.Event.call(this,target,name,data);
};
com.isartdigital.utils.events.LoaderEvent.__name__ = ["com","isartdigital","utils","events","LoaderEvent"];
com.isartdigital.utils.events.LoaderEvent.__super__ = PIXI.Event;
com.isartdigital.utils.events.LoaderEvent.prototype = $extend(PIXI.Event.prototype,{
	__class__: com.isartdigital.utils.events.LoaderEvent
});
com.isartdigital.utils.game.BoxType = { __ename__ : true, __constructs__ : ["NONE","SIMPLE","MULTIPLE","SELF"] };
com.isartdigital.utils.game.BoxType.NONE = ["NONE",0];
com.isartdigital.utils.game.BoxType.NONE.__enum__ = com.isartdigital.utils.game.BoxType;
com.isartdigital.utils.game.BoxType.SIMPLE = ["SIMPLE",1];
com.isartdigital.utils.game.BoxType.SIMPLE.__enum__ = com.isartdigital.utils.game.BoxType;
com.isartdigital.utils.game.BoxType.MULTIPLE = ["MULTIPLE",2];
com.isartdigital.utils.game.BoxType.MULTIPLE.__enum__ = com.isartdigital.utils.game.BoxType;
com.isartdigital.utils.game.BoxType.SELF = ["SELF",3];
com.isartdigital.utils.game.BoxType.SELF.__enum__ = com.isartdigital.utils.game.BoxType;
com.isartdigital.utils.game.Camera = function() {
	this.delayV = 60;
	this.countV = 0;
	this.delayH = 120;
	this.countH = 0;
	this.inertiaMin = new PIXI.Point(2,8);
	this.inertiaMax = new PIXI.Point(40,20);
};
com.isartdigital.utils.game.Camera.__name__ = ["com","isartdigital","utils","game","Camera"];
com.isartdigital.utils.game.Camera.getInstance = function() {
	if(com.isartdigital.utils.game.Camera.instance == null) com.isartdigital.utils.game.Camera.instance = new com.isartdigital.utils.game.Camera();
	return com.isartdigital.utils.game.Camera.instance;
};
com.isartdigital.utils.game.Camera.prototype = {
	setTarget: function(pTarget) {
		if(pTarget.stage == null) {
			com.isartdigital.utils.Debug.warn("L'élément ciblé n'est pas attaché à la DisplayList, l'action est ignorée.");
			return;
		}
		this.target = pTarget;
	}
	,setFocus: function(pFocus) {
		this.focus = pFocus;
	}
	,changePosition: function(pDelay) {
		if(pDelay == null) pDelay = true;
		this.countH++;
		this.countV++;
		var lCenter = com.isartdigital.utils.system.DeviceCapabilities.getScreenRect(this.target.parent);
		var lFocus = this.target.toLocal(this.focus.position,this.focus.parent);
		var lInertiaX;
		if(pDelay) lInertiaX = this.getInertiaX(); else lInertiaX = 1;
		var lInertiaY;
		if(pDelay) lInertiaY = this.getInertiaY(); else lInertiaY = 1;
		var lDeltaX = (lCenter.x + lCenter.width / 2 - lFocus.x - this.target.x) / lInertiaX;
		var lDeltaY = (lCenter.y + lCenter.height / 2 - lFocus.y - this.target.y) / lInertiaY;
		this.target.x += lDeltaX;
		this.target.y += lDeltaY;
	}
	,getInertiaX: function() {
		if((function($this) {
			var $r;
			var a = $this.countH;
			var b = $this.delayH;
			var aNeg = a < 0;
			var bNeg = b < 0;
			$r = aNeg != bNeg?aNeg:a > b;
			return $r;
		}(this))) return this.inertiaMin.x;
		return this.inertiaMax.x + (function($this) {
			var $r;
			var $int = $this.countH;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) * (this.inertiaMin.x - this.inertiaMax.x) / (function($this) {
			var $r;
			var int1;
			{
				var int2 = $this.delayH;
				if(int2 < 0) int1 = 4294967296.0 + int2; else int1 = int2 + 0.0;
			}
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this));
	}
	,getInertiaY: function() {
		if((function($this) {
			var $r;
			var a = $this.countV;
			var b = $this.delayV;
			var aNeg = a < 0;
			var bNeg = b < 0;
			$r = aNeg != bNeg?aNeg:a > b;
			return $r;
		}(this))) return this.inertiaMin.y;
		return this.inertiaMax.y + (function($this) {
			var $r;
			var $int = $this.countV;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) * (this.inertiaMin.y - this.inertiaMax.y) / (function($this) {
			var $r;
			var int1;
			{
				var int2 = $this.delayV;
				if(int2 < 0) int1 = 4294967296.0 + int2; else int1 = int2 + 0.0;
			}
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this));
	}
	,setPosition: function() {
		com.isartdigital.utils.game.GameStage.getInstance().render();
		this.changePosition(false);
	}
	,move: function() {
		if(this.focus != null) this.changePosition();
	}
	,resetX: function() {
		this.countH = 0;
	}
	,resetY: function() {
		this.countV = 0;
	}
	,destroy: function() {
		com.isartdigital.utils.game.Camera.instance = null;
	}
	,__class__: com.isartdigital.utils.game.Camera
};
com.isartdigital.utils.game.CollisionManager = function() {
};
com.isartdigital.utils.game.CollisionManager.__name__ = ["com","isartdigital","utils","game","CollisionManager"];
com.isartdigital.utils.game.CollisionManager.hitTestObject = function(pObjectA,pObjectB) {
	return com.isartdigital.utils.game.CollisionManager.getIntersection(pObjectA.getBounds(),pObjectB.getBounds());
};
com.isartdigital.utils.game.CollisionManager.hitTestPoint = function(pItem,pGlobalPoint) {
	var lTransform = pItem.worldTransform;
	var a = lTransform.a;
	var b = lTransform.b;
	var c = lTransform.c;
	var tx = lTransform.tx;
	var d = lTransform.d;
	var ty = lTransform.ty;
	var id = 1 / (a * d + c * -b);
	var x = d * id * pGlobalPoint.x + -c * id * pGlobalPoint.y + (ty * c - tx * d) * id;
	var y = a * id * pGlobalPoint.y + -b * id * pGlobalPoint.x + (-ty * a + tx * b) * id;
	if(pItem.hitArea != null && pItem.hitArea.contains != null) return pItem.hitArea.contains(x,y); else if(js.Boot.__instanceof(pItem,PIXI.Sprite)) {
		var lSprite;
		lSprite = js.Boot.__cast(pItem , PIXI.Sprite);
		var lWidth = lSprite.texture.frame.width;
		var lHeight = lSprite.texture.frame.height;
		var lX1 = -lWidth * lSprite.anchor.x;
		var lY1;
		if(x > lX1 && x < lX1 + lWidth) {
			lY1 = -lHeight * lSprite.anchor.y;
			if(y > lY1 && y < lY1 + lHeight) return true;
		}
	} else if(js.Boot.__instanceof(pItem,PIXI.Graphics)) {
		var lGraphicsData = pItem.graphicsData;
		var _g1 = 0;
		var _g = lGraphicsData.length;
		while(_g1 < _g) {
			var i = _g1++;
			var lData = lGraphicsData[i];
			if(!lData.fill) continue;
			if(lData.shape != null && lData.shape.contains(x,y)) return true;
		}
	} else if(js.Boot.__instanceof(pItem,pixi.display.DisplayObjectContainer)) {
		var lContainer;
		lContainer = js.Boot.__cast(pItem , pixi.display.DisplayObjectContainer);
		var lLength = lContainer.children.length;
		var _g2 = 0;
		while(_g2 < lLength) {
			var i1 = _g2++;
			if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(lContainer.children[i1],pGlobalPoint)) return true;
		}
	}
	return false;
};
com.isartdigital.utils.game.CollisionManager.hasCollision = function(pHitBoxA,pHitBoxB,pPointsA,pPointsB) {
	if(pHitBoxA == null || pHitBoxB == null) return false;
	if(!com.isartdigital.utils.game.CollisionManager.hitTestObject(pHitBoxA,pHitBoxB)) return false;
	if(pPointsA == null && pPointsB == null) return true;
	if(pPointsA != null) return com.isartdigital.utils.game.CollisionManager.testPoints(pPointsA,pHitBoxB);
	if(pPointsB != null) return com.isartdigital.utils.game.CollisionManager.testPoints(pPointsB,pHitBoxA);
	return false;
};
com.isartdigital.utils.game.CollisionManager.getIntersection = function(pRectA,pRectB) {
	return !(pRectB.x > pRectA.x + pRectA.width || pRectB.x + pRectB.width < pRectA.x || pRectB.y > pRectA.y + pRectA.height || pRectB.y + pRectB.height < pRectA.y);
};
com.isartdigital.utils.game.CollisionManager.testPoints = function(pHitPoints,pHitBox) {
	var lLength = pHitPoints.length;
	var _g = 0;
	while(_g < lLength) {
		var i = _g++;
		if(com.isartdigital.utils.game.CollisionManager.hitTestPoint(pHitBox,pHitPoints[i])) return true;
	}
	return false;
};
com.isartdigital.utils.game.CollisionManager.prototype = {
	__class__: com.isartdigital.utils.game.CollisionManager
};
com.isartdigital.utils.game.GameStage = function() {
	this._safeZone = new PIXI.Rectangle(0,0,2048,1366);
	this._scaleMode = com.isartdigital.utils.game.GameStageScale.SHOW_ALL;
	this._alignMode = com.isartdigital.utils.game.GameStageAlign.CENTER;
	pixi.display.DisplayObjectContainer.call(this);
	this.gameContainer = new pixi.display.DisplayObjectContainer();
	this.addChild(this.gameContainer);
	this.screensContainer = new pixi.display.DisplayObjectContainer();
	this.addChild(this.screensContainer);
	this.hudContainer = new pixi.display.DisplayObjectContainer();
	this.addChild(this.hudContainer);
	this.popinsContainer = new pixi.display.DisplayObjectContainer();
	this.addChild(this.popinsContainer);
	this.eventTarget = new com.isartdigital.utils.events.EventTarget();
};
com.isartdigital.utils.game.GameStage.__name__ = ["com","isartdigital","utils","game","GameStage"];
com.isartdigital.utils.game.GameStage.getInstance = function() {
	if(com.isartdigital.utils.game.GameStage.instance == null) com.isartdigital.utils.game.GameStage.instance = new com.isartdigital.utils.game.GameStage();
	return com.isartdigital.utils.game.GameStage.instance;
};
com.isartdigital.utils.game.GameStage.__super__ = pixi.display.DisplayObjectContainer;
com.isartdigital.utils.game.GameStage.prototype = $extend(pixi.display.DisplayObjectContainer.prototype,{
	init: function(pRender,pSafeZoneWidth,pSafeZoneHeight,centerGameContainer,centerScreensContainer,centerPopinContainer) {
		if(centerPopinContainer == null) centerPopinContainer = true;
		if(centerScreensContainer == null) centerScreensContainer = true;
		if(centerGameContainer == null) centerGameContainer = false;
		if(pSafeZoneHeight == null) pSafeZoneHeight = 2048;
		if(pSafeZoneWidth == null) pSafeZoneWidth = 2048;
		this._render = pRender;
		this._safeZone = new PIXI.Rectangle(0,0,(function($this) {
			var $r;
			var $int = pSafeZoneWidth;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)),(function($this) {
			var $r;
			var int1 = pSafeZoneHeight;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this)));
		if(centerGameContainer) {
			this.gameContainer.x = this.get_safeZone().width / 2;
			this.gameContainer.y = this.get_safeZone().height / 2;
		}
		if(centerScreensContainer) {
			this.screensContainer.x = this.get_safeZone().width / 2;
			this.screensContainer.y = this.get_safeZone().height / 2;
		}
		if(centerPopinContainer) {
			this.popinsContainer.x = this.get_safeZone().width / 2;
			this.popinsContainer.y = this.get_safeZone().height / 2;
		}
	}
	,resize: function() {
		var lWidth = com.isartdigital.utils.system.DeviceCapabilities.get_width();
		var lHeight = com.isartdigital.utils.system.DeviceCapabilities.get_height();
		var lRatio = Math.round(10000 * Math.min((function($this) {
			var $r;
			var $int = lWidth;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) / this.get_safeZone().width,(function($this) {
			var $r;
			var int1 = lHeight;
			$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
			return $r;
		}(this)) / this.get_safeZone().height)) / 10000;
		if(this.get_scaleMode() == com.isartdigital.utils.game.GameStageScale.SHOW_ALL) this.scale.set(lRatio,lRatio); else this.scale.set(1,1);
		if(this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.LEFT || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.TOP_LEFT || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.BOTTOM_LEFT) this.x = 0; else if(this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.RIGHT || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.TOP_RIGHT || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.BOTTOM_RIGHT) this.x = (function($this) {
			var $r;
			var int2 = lWidth;
			$r = int2 < 0?4294967296.0 + int2:int2 + 0.0;
			return $r;
		}(this)) - this.get_safeZone().width * this.scale.x; else this.x = ((function($this) {
			var $r;
			var int3 = lWidth;
			$r = int3 < 0?4294967296.0 + int3:int3 + 0.0;
			return $r;
		}(this)) - this.get_safeZone().width * this.scale.x) / 2;
		if(this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.TOP || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.TOP_LEFT || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.TOP_RIGHT) this.y = 0; else if(this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.BOTTOM || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.BOTTOM_LEFT || this.get_alignMode() == com.isartdigital.utils.game.GameStageAlign.BOTTOM_RIGHT) this.y = (function($this) {
			var $r;
			var int4 = lHeight;
			$r = int4 < 0?4294967296.0 + int4:int4 + 0.0;
			return $r;
		}(this)) - this.get_safeZone().height * this.scale.y; else this.y = ((function($this) {
			var $r;
			var int5 = lHeight;
			$r = int5 < 0?4294967296.0 + int5:int5 + 0.0;
			return $r;
		}(this)) - this.get_safeZone().height * this.scale.y) / 2;
		this.render();
		this.eventTarget.dispatchEvent("GameStageEvent.RESIZE",{ width : lWidth, height : lHeight});
	}
	,render: function() {
		if(this._render != null) this._render();
	}
	,get_alignMode: function() {
		return this._alignMode;
	}
	,set_alignMode: function(pAlign) {
		this._alignMode = pAlign;
		this.resize();
		return this._alignMode;
	}
	,get_scaleMode: function() {
		return this._scaleMode;
	}
	,set_scaleMode: function(pScale) {
		this._scaleMode = pScale;
		this.resize();
		return this._scaleMode;
	}
	,get_safeZone: function() {
		return this._safeZone;
	}
	,getGameContainer: function() {
		return this.gameContainer;
	}
	,getScreensContainer: function() {
		return this.screensContainer;
	}
	,getHudContainer: function() {
		return this.hudContainer;
	}
	,getPopinsContainer: function() {
		return this.popinsContainer;
	}
	,addEventListener: function(pType,pListener) {
		this.eventTarget.addEventListener(pType,pListener);
	}
	,removeEventListener: function(pType,pListener) {
		this.eventTarget.removeEventListener(pType,pListener);
	}
	,destroy: function() {
		this.eventTarget = null;
		com.isartdigital.utils.game.GameStage.instance = null;
	}
	,__class__: com.isartdigital.utils.game.GameStage
});
com.isartdigital.utils.game.GameStageAlign = { __ename__ : true, __constructs__ : ["TOP","TOP_LEFT","TOP_RIGHT","CENTER","LEFT","RIGHT","BOTTOM","BOTTOM_LEFT","BOTTOM_RIGHT"] };
com.isartdigital.utils.game.GameStageAlign.TOP = ["TOP",0];
com.isartdigital.utils.game.GameStageAlign.TOP.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.TOP_LEFT = ["TOP_LEFT",1];
com.isartdigital.utils.game.GameStageAlign.TOP_LEFT.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.TOP_RIGHT = ["TOP_RIGHT",2];
com.isartdigital.utils.game.GameStageAlign.TOP_RIGHT.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.CENTER = ["CENTER",3];
com.isartdigital.utils.game.GameStageAlign.CENTER.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.LEFT = ["LEFT",4];
com.isartdigital.utils.game.GameStageAlign.LEFT.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.RIGHT = ["RIGHT",5];
com.isartdigital.utils.game.GameStageAlign.RIGHT.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.BOTTOM = ["BOTTOM",6];
com.isartdigital.utils.game.GameStageAlign.BOTTOM.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",7];
com.isartdigital.utils.game.GameStageAlign.BOTTOM_LEFT.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",8];
com.isartdigital.utils.game.GameStageAlign.BOTTOM_RIGHT.__enum__ = com.isartdigital.utils.game.GameStageAlign;
com.isartdigital.utils.game.GameStageScale = { __ename__ : true, __constructs__ : ["NO_SCALE","SHOW_ALL"] };
com.isartdigital.utils.game.GameStageScale.NO_SCALE = ["NO_SCALE",0];
com.isartdigital.utils.game.GameStageScale.NO_SCALE.__enum__ = com.isartdigital.utils.game.GameStageScale;
com.isartdigital.utils.game.GameStageScale.SHOW_ALL = ["SHOW_ALL",1];
com.isartdigital.utils.game.GameStageScale.SHOW_ALL.__enum__ = com.isartdigital.utils.game.GameStageScale;
com.isartdigital.utils.loader = {};
com.isartdigital.utils.loader.Loader = function() {
	PIXI.EventTarget.call(this);
	console.log("========== Loader: Initialisation ==========");
	this.txtFiles = [];
	this.assetsFiles = [];
	this.soundsList = [];
	this.soundsFiles = [];
};
com.isartdigital.utils.loader.Loader.__name__ = ["com","isartdigital","utils","loader","Loader"];
com.isartdigital.utils.loader.Loader.getContent = function(pFile) {
	var key = com.isartdigital.utils.Config.get_assetsPath() + pFile;
	return com.isartdigital.utils.loader.Loader.txtLoaded.get(key);
};
com.isartdigital.utils.loader.Loader.__super__ = PIXI.EventTarget;
com.isartdigital.utils.loader.Loader.prototype = $extend(PIXI.EventTarget.prototype,{
	addTxtFile: function(pUrl) {
		console.log("Loader: addTxtFile = " + com.isartdigital.utils.Config.get_assetsPath() + pUrl);
		this.txtFiles.push(com.isartdigital.utils.Config.get_assetsPath() + pUrl);
	}
	,addAssetFile: function(pUrl) {
		console.log("Loader: addAssetFile = " + com.isartdigital.utils.Config.get_assetsPath() + pUrl);
		this.assetsFiles.unshift(com.isartdigital.utils.Config.get_assetsPath() + pUrl);
	}
	,addSoundFile: function(pUrl) {
		console.log("Loader: addSoundFile = " + com.isartdigital.utils.Config.get_soundsPath() + pUrl);
		this.soundsList.push(com.isartdigital.utils.Config.get_soundsPath() + pUrl);
	}
	,load: function() {
		console.log("---------- Loader: Chargement ----------");
		this.loaded = 0;
		this.loadSoundsLists();
	}
	,loadSoundsLists: function() {
		if(this.soundsList.length > 0) {
			var lLoader = new PIXI.JsonLoader(this.soundsList.shift());
			lLoader.addEventListener("loaded",$bind(this,this.onSoundsListsLoaded));
			lLoader.load();
		} else {
			this.nbFiles = this.txtFiles.length + this.assetsFiles.length + this.soundsFiles.length;
			this.loadNext();
		}
	}
	,onSoundsListsLoaded: function(pEvent) {
		console.log("Loader: " + Std.string(pEvent.target.url) + " chargé");
		pEvent.target.removeEventListener("loaded",$bind(this,this.onSoundsListsLoaded));
		var lList = (js.Boot.__cast(pEvent.target , PIXI.JsonLoader)).json;
		this.addSounds(Reflect.field(lList,"fxs"),false,Reflect.field(lList,"extensions"));
		this.addSounds(Reflect.field(lList,"musics"),true,Reflect.field(lList,"extensions"));
		this.loadSoundsLists();
	}
	,addSounds: function(pList,pLoop,pExtensions) {
		var _g = 0;
		var _g1 = Reflect.fields(pList);
		while(_g < _g1.length) {
			var lID = _g1[_g];
			++_g;
			this.soundsFiles.push({ name : lID, options : { urls : (function($this) {
				var $r;
				var _g2 = [];
				{
					var _g4 = 0;
					var _g3 = pExtensions.length;
					while(_g4 < _g3) {
						var i = _g4++;
						_g2.push(com.isartdigital.utils.Config.get_soundsPath() + lID + "." + pExtensions[i]);
					}
				}
				$r = _g2;
				return $r;
			}(this)), volume : Reflect.field(pList,lID) / 100, loop : pLoop, onload : $bind(this,this.onSoundLoaded)}});
		}
	}
	,loadNext: function() {
		if(this.txtFiles.length > 0) {
			var lLoader = new PIXI.JsonLoader(this.txtFiles.shift());
			lLoader.addEventListener("loaded",$bind(this,this.onTxtLoaded));
			lLoader.load();
		} else if(this.assetsFiles != null) {
			var lLoader1 = new PIXI.AssetLoader(this.assetsFiles);
			lLoader1.addEventListener("onProgress",$bind(this,this.onAssetLoaded));
			lLoader1.load();
		} else if(this.soundsFiles.length > 0) com.isartdigital.utils.sounds.SoundManager.addSound(this.soundsFiles[0].name,new window.Howl(this.soundsFiles[0].options)); else this.onComplete();
	}
	,onTxtLoaded: function(pEvent) {
		pEvent.target.removeEventListener("loaded",$bind(this,this.onTxtLoaded));
		var k = pEvent.target.url;
		var v = (js.Boot.__cast(pEvent.target , PIXI.JsonLoader)).json;
		com.isartdigital.utils.loader.Loader.txtLoaded.set(k,v);
		v;
		this.currentLoadComplete();
		console.log("Loader: " + Std.string(pEvent.target.url) + " chargé (" + this.loaded + "/" + this.nbFiles + ")");
		this.loadNext();
	}
	,onAssetLoaded: function(pEvent) {
		if(js.Boot.__instanceof(pEvent.content.loader,PIXI.JsonLoader)) {
			var k = pEvent.content.loader.url;
			var v = (js.Boot.__cast(pEvent.content.loader , PIXI.JsonLoader)).json;
			com.isartdigital.utils.loader.Loader.txtLoaded.set(k,v);
			v;
		}
		this.currentLoadComplete();
		console.log("Loader: " + pEvent.target.assetURLs[pEvent.target.loadCount] + " chargé (" + this.loaded + "/" + this.nbFiles + ")");
		if(pEvent.target.loadCount == 0) {
			pEvent.target.removeEventListener("onProgress",$bind(this,this.onAssetLoaded));
			this.assetsFiles = null;
			this.loadNext();
		}
	}
	,onSoundLoaded: function() {
		this.currentLoadComplete();
		console.log("Loader: Son " + this.soundsFiles[0].name + " chargé (" + this.loaded + "/" + this.nbFiles + ")");
		this.soundsFiles.shift();
		this.loadNext();
	}
	,currentLoadComplete: function() {
		this.loaded++;
		this.dispatchEvent("LoaderEvent.PROGRESS",{ loaded : this.loaded, total : this.nbFiles});
	}
	,onComplete: function() {
		console.log("---------- Loader: Fin ----------");
		this.dispatchEvent("LoaderEvent.COMPLETE");
	}
	,__class__: com.isartdigital.utils.loader.Loader
});
com.isartdigital.utils.sounds = {};
com.isartdigital.utils.sounds.SoundManager = function() {
};
com.isartdigital.utils.sounds.SoundManager.__name__ = ["com","isartdigital","utils","sounds","SoundManager"];
com.isartdigital.utils.sounds.SoundManager.addSound = function(pName,pSound) {
	if(com.isartdigital.utils.sounds.SoundManager.list == null) com.isartdigital.utils.sounds.SoundManager.list = new haxe.ds.StringMap();
	com.isartdigital.utils.sounds.SoundManager.list.set(pName,pSound);
	pSound;
};
com.isartdigital.utils.sounds.SoundManager.getSound = function(pName) {
	return com.isartdigital.utils.sounds.SoundManager.list.get(pName);
};
com.isartdigital.utils.sounds.SoundManager.prototype = {
	__class__: com.isartdigital.utils.sounds.SoundManager
};
com.isartdigital.utils.system = {};
com.isartdigital.utils.system.DeviceCapabilities = function() { };
com.isartdigital.utils.system.DeviceCapabilities.__name__ = ["com","isartdigital","utils","system","DeviceCapabilities"];
com.isartdigital.utils.system.DeviceCapabilities.get_height = function() {
	return window.innerHeight;
};
com.isartdigital.utils.system.DeviceCapabilities.get_width = function() {
	return window.innerWidth;
};
com.isartdigital.utils.system.DeviceCapabilities.displayFullScreenButton = function() {
	if(!new EReg("(iPad|iPhone|iPod)","g").match(window.navigator.userAgent) && !new EReg("MSIE","i").match(window.navigator.userAgent)) {
		window.document.onfullscreenchange = com.isartdigital.utils.system.DeviceCapabilities.onChangeFullScreen;
		window.document.onwebkitfullscreenchange = com.isartdigital.utils.system.DeviceCapabilities.onChangeFullScreen;
		window.document.onmozfullscreenchange = com.isartdigital.utils.system.DeviceCapabilities.onChangeFullScreen;
		window.document.onmsfullscreenchange = com.isartdigital.utils.system.DeviceCapabilities.onChangeFullScreen;
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton = new Image();
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.style.position = "absolute";
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.style.right = "0px";
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.style.top = "0px";
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.style.cursor = "pointer";
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.width = Std["int"](com.isartdigital.utils.system.DeviceCapabilities.getSizeFactor() * 0.075);
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.height = Std["int"](com.isartdigital.utils.system.DeviceCapabilities.getSizeFactor() * 0.075);
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.onclick = com.isartdigital.utils.system.DeviceCapabilities.enterFullscreen;
		com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.src = com.isartdigital.utils.Config.get_assetsPath() + "fullscreen.png";
		window.document.body.appendChild(com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton);
	}
};
com.isartdigital.utils.system.DeviceCapabilities.enterFullscreen = function(pEvent) {
	var lDocElm = window.document.documentElement;
	if($bind(lDocElm,lDocElm.requestFullscreen) != null) lDocElm.requestFullscreen(); else if(lDocElm.mozRequestFullScreen != null) lDocElm.mozRequestFullScreen(); else if(lDocElm.webkitRequestFullScreen != null) lDocElm.webkitRequestFullScreen(); else if(lDocElm.msRequestFullscreen != null) lDocElm.msRequestFullscreen();
};
com.isartdigital.utils.system.DeviceCapabilities.exitFullscreen = function() {
	if(($_=window.document,$bind($_,$_.exitFullscreen)) != null) window.document.exitFullscreen(); else if(window.document.mozCancelFullScreen != null) window.document.mozCancelFullScreen(); else if(window.document.webkitCancelFullScreen != null) window.document.webkitCancelFullScreen(); else if(window.document.msExitFullscreen) window.document.msExitFullscreen();
};
com.isartdigital.utils.system.DeviceCapabilities.onChangeFullScreen = function(pEvent) {
	if(window.document.fullScreen || (window.document.mozFullScreen || (window.document.webkitIsFullScreen || window.document.msFullscreenElement))) com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.style.display = "none"; else com.isartdigital.utils.system.DeviceCapabilities.fullScreenButton.style.display = "block";
	pEvent.preventDefault();
};
com.isartdigital.utils.system.DeviceCapabilities.getSizeFactor = function() {
	var lSize = Math.floor(Math.min(window.screen.width,window.screen.height));
	if(!(new EReg("Android","i").match(window.navigator.userAgent) || new EReg("iPhone|iPad|iPod","i").match(window.navigator.userAgent) || new EReg("BlackBerry","i").match(window.navigator.userAgent) || new EReg("PlayBook","i").match(window.navigator.userAgent) || new EReg("IEMobile","i").match(window.navigator.userAgent))) lSize /= 3;
	return lSize;
};
com.isartdigital.utils.system.DeviceCapabilities.getScreenRect = function(pTarget) {
	if(pTarget.stage == null) {
		com.isartdigital.utils.Debug.warn("L'élément que vous ciblez n'est pas attaché à la DisplayList, le repositionnement est ignoré.");
		return null;
	}
	var lTopLeft = new PIXI.Point(0,0);
	var lBottomRight = new PIXI.Point((function($this) {
		var $r;
		var this1 = com.isartdigital.utils.system.DeviceCapabilities.get_width();
		var $int = this1;
		$r = $int < 0?4294967296.0 + $int:$int + 0.0;
		return $r;
	}(this)),(function($this) {
		var $r;
		var this2 = com.isartdigital.utils.system.DeviceCapabilities.get_height();
		var int1 = this2;
		$r = int1 < 0?4294967296.0 + int1:int1 + 0.0;
		return $r;
	}(this)));
	lTopLeft = pTarget.toLocal(lTopLeft);
	lBottomRight = pTarget.toLocal(lBottomRight);
	return new PIXI.Rectangle(lTopLeft.x,lTopLeft.y,lBottomRight.x - lTopLeft.x,lBottomRight.y - lTopLeft.y);
};
com.isartdigital.utils.ui.Keyboard = function() {
	this.keys = [];
	window.addEventListener("keydown",$bind(this,this.onKeyDown));
	window.addEventListener("keyup",$bind(this,this.onKeyUp));
	var _g = 1;
	while(_g < 255) {
		var i = _g++;
		this.keys.push(false);
	}
};
com.isartdigital.utils.ui.Keyboard.__name__ = ["com","isartdigital","utils","ui","Keyboard"];
com.isartdigital.utils.ui.Keyboard.keyboard = function() {
	com.isartdigital.utils.ui.Keyboard.getInstance();
};
com.isartdigital.utils.ui.Keyboard.getInstance = function() {
	if(com.isartdigital.utils.ui.Keyboard.instance == null) com.isartdigital.utils.ui.Keyboard.instance = new com.isartdigital.utils.ui.Keyboard();
	return com.isartdigital.utils.ui.Keyboard.instance;
};
com.isartdigital.utils.ui.Keyboard.getKeyDown = function(key) {
	return com.isartdigital.utils.ui.Keyboard.instance.keys[key];
};
com.isartdigital.utils.ui.Keyboard.prototype = {
	onKeyUp: function(e) {
		this.keys[e.keyCode] = false;
	}
	,onKeyDown: function(e) {
		this.keys[e.keyCode] = true;
	}
	,__class__: com.isartdigital.utils.ui.Keyboard
};
com.isartdigital.utils.ui.UIPosition = function() {
};
com.isartdigital.utils.ui.UIPosition.__name__ = ["com","isartdigital","utils","ui","UIPosition"];
com.isartdigital.utils.ui.UIPosition.setPosition = function(pTarget,pPosition,pOffsetX,pOffsetY) {
	if(pOffsetY == null) pOffsetY = 0;
	if(pOffsetX == null) pOffsetX = 0;
	if(pTarget.stage == null) {
		com.isartdigital.utils.Debug.warn("L'élément que vous voulez repositionner n'est pas attaché à la DisplayList, le repositionnement est ignoré.");
		return;
	}
	var lScreen = com.isartdigital.utils.system.DeviceCapabilities.getScreenRect(pTarget.parent);
	var lTopLeft = new PIXI.Point(lScreen.x,lScreen.y);
	var lBottomRight = new PIXI.Point(lScreen.x + lScreen.width,lScreen.y + lScreen.height);
	if(pPosition == "top" || pPosition == "topLeft" || pPosition == "topRight") pTarget.y = lTopLeft.y + pOffsetY;
	if(pPosition == "bottom" || pPosition == "bottomLeft" || pPosition == "bottomRight") pTarget.y = lBottomRight.y - pOffsetY;
	if(pPosition == "left" || pPosition == "topLeft" || pPosition == "bottomLeft") pTarget.x = lTopLeft.x + pOffsetX;
	if(pPosition == "right" || pPosition == "topRight" || pPosition == "bottomRight") pTarget.x = lBottomRight.x - pOffsetX;
	if(pPosition == "fitWidth" || pPosition == "fitScreen") {
		pTarget.x = lTopLeft.x;
		pTarget.width = lBottomRight.x - lTopLeft.x;
	}
	if(pPosition == "fitHeight" || pPosition == "fitScreen") {
		pTarget.y = lTopLeft.y;
		pTarget.height = lBottomRight.y - lTopLeft.y;
	}
};
com.isartdigital.utils.ui.UIPosition.prototype = {
	__class__: com.isartdigital.utils.ui.UIPosition
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
pixi.DomDefinitions = function() { };
pixi.DomDefinitions.__name__ = ["pixi","DomDefinitions"];
pixi.renderers = {};
pixi.renderers.IRenderer = function() { };
pixi.renderers.IRenderer.__name__ = ["pixi","renderers","IRenderer"];
pixi.renderers.IRenderer.prototype = {
	__class__: pixi.renderers.IRenderer
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
com.isartdigital.Main.CONFIG_PATH = "config.json";
com.isartdigital.game.LevelLoader.GROUND = "Ground";
com.isartdigital.game.LevelLoader.LIMIT_LEFT = "LimitLeft";
com.isartdigital.game.LevelLoader.LIMIT_RIGHT = "LimitRight";
com.isartdigital.game.LevelLoader.WALL = "Wall";
com.isartdigital.game.LevelLoader.DESTRUCTIBLE = "Destructible";
com.isartdigital.game.LevelLoader.BRIGDE_RIGHT = "BridgeRight";
com.isartdigital.game.LevelLoader.BRIGDE_LEFT = "BridgeLeft";
com.isartdigital.game.LevelLoader.PLATFORM = "Platform";
com.isartdigital.game.LevelLoader.ENEMY_FIRE = "EnemyFire";
com.isartdigital.game.LevelLoader.ENEMY_SPEED = "EnemySpeed";
com.isartdigital.game.LevelLoader.ENEMY_TURRET = "EnemyTurret";
com.isartdigital.game.LevelLoader.ENEMY_BOMB = "EnemyBomb";
com.isartdigital.game.LevelLoader.CHECKPOINT = "CheckPoint";
com.isartdigital.game.LevelLoader.END_LEVEL = "EndLevel";
com.isartdigital.game.LevelLoader.KILLZONE_STATIC = "KillZoneStatic";
com.isartdigital.game.LevelLoader.KILLZONE_DYNAMIC = "KillZoneDynamic";
com.isartdigital.game.LevelLoader.COLLECTABLE = "Collectable";
com.isartdigital.game.LevelLoader.PLAYER = "Player";
com.isartdigital.utils.game.StateGraphic.ANIM_SUFFIX = "";
com.isartdigital.utils.game.StateGraphic.BOX_SUFFIX = "box";
com.isartdigital.utils.game.StateGraphic.textureDigits = 4;
com.isartdigital.utils.game.StateGraphic.animAlpha = 1;
com.isartdigital.utils.game.StateGraphic.boxAlpha = 0;
com.isartdigital.game.level.Collectable.list = new Array();
com.isartdigital.game.level.Collectable.NB_COLLECTABLES_POWERUP = 5;
com.isartdigital.game.level.Destructible.list = new Array();
com.isartdigital.game.level.KillZone.list = new Array();
com.isartdigital.game.level.KillZoneDynamic.WIDTH_MOVEMENT = 1000;
com.isartdigital.game.level.KillZoneDynamic.ROTATION_SPEED = 0.2;
com.isartdigital.game.level.KillZoneDynamic.TO_RADIAN = Math.PI / 180;
com.isartdigital.game.level.Platform.list = new Array();
com.isartdigital.game.level.Wall.list = new Array();
com.isartdigital.game.sprites.CheckPoint.list = new Array();
com.isartdigital.game.sprites.Player.WAIT_STATE = "wait";
com.isartdigital.game.sprites.Player.SHOOT_WAIT_STATE = "waitShoot";
com.isartdigital.game.sprites.Player.WALK_STATE = "walk";
com.isartdigital.game.sprites.Player.SHOOT_WALK_STATE = "walkShoot";
com.isartdigital.game.sprites.Player.JUMP_STATE = "jump";
com.isartdigital.game.sprites.Player.FALL_STATE = "fall";
com.isartdigital.game.sprites.Player.HURT_STATE = "hurt";
com.isartdigital.game.sprites.Player.RECEPTION_STATE = "reception";
com.isartdigital.game.sprites.Player.PLATFORM_JUMP_DELAY = 15;
com.isartdigital.game.sprites.Player.SUPER_SHOOT_DELAY = 30;
com.isartdigital.game.sprites.Player.TO_RADIAN = Math.PI / 180;
com.isartdigital.game.sprites.Player.BLINK_FRAME_DELAY = 60;
com.isartdigital.game.sprites.enemies.Enemy.WAIT_STATE = "wait";
com.isartdigital.game.sprites.enemies.Enemy.WALK_STATE = "walk";
com.isartdigital.game.sprites.enemies.Enemy.DEATH_STATE = "death";
com.isartdigital.game.sprites.enemies.Enemy.WIDTH_MOVEMENT = 1000;
com.isartdigital.game.sprites.enemies.Enemy.SHOOT_DELAY = 45;
com.isartdigital.game.sprites.enemies.Enemy.BLINK_FRAME_DELAY = 60;
com.isartdigital.game.sprites.enemies.Enemy.list = new Array();
com.isartdigital.game.sprites.enemies.EnemyBomb.EXPLOSION_FRAME_DELAY = 60;
com.isartdigital.game.sprites.enemies.EnemyFire.TO_RADIAN = Math.PI / 180;
com.isartdigital.game.sprites.enemies.EnemyTurret.TO_RADIAN = Math.PI / 180;
com.isartdigital.game.sprites.shoots.Shoot.list = new Array();
com.isartdigital.game.sprites.shoots.Shoot.SHOOT_DELAY = 80;
com.isartdigital.utils.ui.Button.UP = 0;
com.isartdigital.utils.ui.Button.OVER = 1;
com.isartdigital.utils.ui.Button.DOWN = 2;
com.isartdigital.ui.screens.LevelSelect.currentLevel = 0;
com.isartdigital.utils.Config._data = { };
com.isartdigital.utils.Debug.QR_SIZE = 0.35;
com.isartdigital.utils.events.GameEvent.GAME_LOOP = "GameEvent.GAME_LOOP";
com.isartdigital.utils.events.GameStageEvent.RESIZE = "GameStageEvent.RESIZE";
com.isartdigital.utils.events.LoaderEvent.PROGRESS = "LoaderEvent.PROGRESS";
com.isartdigital.utils.events.LoaderEvent.COMPLETE = "LoaderEvent.COMPLETE";
com.isartdigital.utils.game.GameStage.SAFE_ZONE_WIDTH = 2048;
com.isartdigital.utils.game.GameStage.SAFE_ZONE_HEIGHT = 1366;
com.isartdigital.utils.loader.Loader.txtLoaded = new haxe.ds.StringMap();
com.isartdigital.utils.sounds.SoundManager.FX = "fxs";
com.isartdigital.utils.sounds.SoundManager.MUSIC = "musics";
com.isartdigital.utils.system.DeviceCapabilities.ICON_SIZE = 0.075;
com.isartdigital.utils.ui.Keyboard.A = 65;
com.isartdigital.utils.ui.Keyboard.B = 66;
com.isartdigital.utils.ui.Keyboard.C = 67;
com.isartdigital.utils.ui.Keyboard.D = 68;
com.isartdigital.utils.ui.Keyboard.E = 69;
com.isartdigital.utils.ui.Keyboard.F = 70;
com.isartdigital.utils.ui.Keyboard.G = 71;
com.isartdigital.utils.ui.Keyboard.H = 72;
com.isartdigital.utils.ui.Keyboard.I = 73;
com.isartdigital.utils.ui.Keyboard.J = 74;
com.isartdigital.utils.ui.Keyboard.K = 75;
com.isartdigital.utils.ui.Keyboard.L = 76;
com.isartdigital.utils.ui.Keyboard.M = 77;
com.isartdigital.utils.ui.Keyboard.N = 78;
com.isartdigital.utils.ui.Keyboard.O = 79;
com.isartdigital.utils.ui.Keyboard.P = 80;
com.isartdigital.utils.ui.Keyboard.Q = 81;
com.isartdigital.utils.ui.Keyboard.R = 82;
com.isartdigital.utils.ui.Keyboard.S = 83;
com.isartdigital.utils.ui.Keyboard.T = 84;
com.isartdigital.utils.ui.Keyboard.U = 85;
com.isartdigital.utils.ui.Keyboard.V = 86;
com.isartdigital.utils.ui.Keyboard.W = 87;
com.isartdigital.utils.ui.Keyboard.X = 88;
com.isartdigital.utils.ui.Keyboard.Y = 89;
com.isartdigital.utils.ui.Keyboard.Z = 90;
com.isartdigital.utils.ui.Keyboard.NUMBER_0 = 48;
com.isartdigital.utils.ui.Keyboard.NUMBER_1 = 49;
com.isartdigital.utils.ui.Keyboard.NUMBER_2 = 50;
com.isartdigital.utils.ui.Keyboard.NUMBER_3 = 51;
com.isartdigital.utils.ui.Keyboard.NUMBER_4 = 52;
com.isartdigital.utils.ui.Keyboard.NUMBER_5 = 53;
com.isartdigital.utils.ui.Keyboard.NUMBER_6 = 54;
com.isartdigital.utils.ui.Keyboard.NUMBER_7 = 55;
com.isartdigital.utils.ui.Keyboard.NUMBER_8 = 56;
com.isartdigital.utils.ui.Keyboard.NUMBER_9 = 57;
com.isartdigital.utils.ui.Keyboard.NUMPAD_0 = 96;
com.isartdigital.utils.ui.Keyboard.NUMPAD_1 = 97;
com.isartdigital.utils.ui.Keyboard.NUMPAD_2 = 98;
com.isartdigital.utils.ui.Keyboard.NUMPAD_3 = 99;
com.isartdigital.utils.ui.Keyboard.NUMPAD_4 = 100;
com.isartdigital.utils.ui.Keyboard.NUMPAD_5 = 101;
com.isartdigital.utils.ui.Keyboard.NUMPAD_6 = 102;
com.isartdigital.utils.ui.Keyboard.NUMPAD_7 = 103;
com.isartdigital.utils.ui.Keyboard.NUMPAD_8 = 104;
com.isartdigital.utils.ui.Keyboard.NUMPAD_9 = 105;
com.isartdigital.utils.ui.Keyboard.NUMPAD_ADD = 107;
com.isartdigital.utils.ui.Keyboard.NUMPAD_DECIMAL = 110;
com.isartdigital.utils.ui.Keyboard.NUMPAD_DIVIDE = 111;
com.isartdigital.utils.ui.Keyboard.NUMPAD_ENTER = 108;
com.isartdigital.utils.ui.Keyboard.NUMPAD_MULTIPLY = 106;
com.isartdigital.utils.ui.Keyboard.NUMPAD_SUBTRACT = 109;
com.isartdigital.utils.ui.Keyboard.F1 = 112;
com.isartdigital.utils.ui.Keyboard.F2 = 113;
com.isartdigital.utils.ui.Keyboard.F3 = 114;
com.isartdigital.utils.ui.Keyboard.F4 = 115;
com.isartdigital.utils.ui.Keyboard.F5 = 116;
com.isartdigital.utils.ui.Keyboard.F6 = 117;
com.isartdigital.utils.ui.Keyboard.F7 = 118;
com.isartdigital.utils.ui.Keyboard.F8 = 119;
com.isartdigital.utils.ui.Keyboard.F9 = 120;
com.isartdigital.utils.ui.Keyboard.F10 = 121;
com.isartdigital.utils.ui.Keyboard.F11 = 122;
com.isartdigital.utils.ui.Keyboard.F12 = 123;
com.isartdigital.utils.ui.Keyboard.F13 = 124;
com.isartdigital.utils.ui.Keyboard.F14 = 125;
com.isartdigital.utils.ui.Keyboard.F15 = 126;
com.isartdigital.utils.ui.Keyboard.LEFT = 37;
com.isartdigital.utils.ui.Keyboard.UP = 38;
com.isartdigital.utils.ui.Keyboard.RIGHT = 39;
com.isartdigital.utils.ui.Keyboard.DOWN = 40;
com.isartdigital.utils.ui.Keyboard.BACKSLASH = 220;
com.isartdigital.utils.ui.Keyboard.BACKSPACE = 8;
com.isartdigital.utils.ui.Keyboard.CAPS_LOCK = 20;
com.isartdigital.utils.ui.Keyboard.COMMA = 188;
com.isartdigital.utils.ui.Keyboard.COMMAND = 15;
com.isartdigital.utils.ui.Keyboard.CONTROL = 17;
com.isartdigital.utils.ui.Keyboard.DELETE = 46;
com.isartdigital.utils.ui.Keyboard.END = 35;
com.isartdigital.utils.ui.Keyboard.ENTER = 13;
com.isartdigital.utils.ui.Keyboard.EQUAL = 187;
com.isartdigital.utils.ui.Keyboard.ESCAPE = 27;
com.isartdigital.utils.ui.Keyboard.HOME = 36;
com.isartdigital.utils.ui.Keyboard.INSERT = 45;
com.isartdigital.utils.ui.Keyboard.LEFTBRACKET = 219;
com.isartdigital.utils.ui.Keyboard.MINUS = 189;
com.isartdigital.utils.ui.Keyboard.PAGE_DOWN = 34;
com.isartdigital.utils.ui.Keyboard.PAGE_UP = 33;
com.isartdigital.utils.ui.Keyboard.PERIOD = 190;
com.isartdigital.utils.ui.Keyboard.QUOTE = 222;
com.isartdigital.utils.ui.Keyboard.RIGHTBRACKET = 221;
com.isartdigital.utils.ui.Keyboard.SEMICOLON = 186;
com.isartdigital.utils.ui.Keyboard.SHIFT = 16;
com.isartdigital.utils.ui.Keyboard.SLASH = 191;
com.isartdigital.utils.ui.Keyboard.SPACE = 32;
com.isartdigital.utils.ui.Keyboard.TAB = 9;
com.isartdigital.utils.ui.Keyboard.MENU = 16777234;
com.isartdigital.utils.ui.Keyboard.SEARCH = 16777247;
com.isartdigital.utils.ui.UIPosition.LEFT = "left";
com.isartdigital.utils.ui.UIPosition.RIGHT = "right";
com.isartdigital.utils.ui.UIPosition.TOP = "top";
com.isartdigital.utils.ui.UIPosition.BOTTOM = "bottom";
com.isartdigital.utils.ui.UIPosition.TOP_LEFT = "topLeft";
com.isartdigital.utils.ui.UIPosition.TOP_RIGHT = "topRight";
com.isartdigital.utils.ui.UIPosition.BOTTOM_LEFT = "bottomLeft";
com.isartdigital.utils.ui.UIPosition.BOTTOM_RIGHT = "bottomRight";
com.isartdigital.utils.ui.UIPosition.FIT_WIDTH = "fitWidth";
com.isartdigital.utils.ui.UIPosition.FIT_HEIGHT = "fitHeight";
com.isartdigital.utils.ui.UIPosition.FIT_SCREEN = "fitScreen";
com.isartdigital.Main.main();
})();
