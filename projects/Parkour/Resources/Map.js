require("Utils.js");

var Map = cc.Class.extend({
    layer:null,
    space:null,
    spriteWidth:0,
    mapCount:2,// total map of resource
    map0:null,
    map1:null,
    ground0:null,
    ground1:null,
    curMap:0,// [0, n]

    ctor:function (layer, space) {
        this.layer = layer;
        this.space = space;
        // init bg map for the first time
        this.map0 = cc.Sprite.create("Map00.png");
        this.map0.setAnchorPoint(cc.p(0, 0));
        this.map0.setPosition(cc.p(0, 0));
        this.layer.addChild(this.map0);

        this.ground0 = cc.Sprite.create("Ground00.png");
        this.ground0.setAnchorPoint(cc.p(0, 0));
        var size = this.ground0.getContentSize();
        this.ground0.setPosition(cc.p(0, g_groundHight - size.height));
        this.layer.addChild(this.ground0);

        this.spriteWidth = this.map0.getContentSize().width;

        this.map1 = cc.Sprite.create("Map01.png");
        this.map1.setAnchorPoint(cc.p(0, 0));
        this.map1.setPosition(cc.p(this.spriteWidth, 0));
        this.layer.addChild(this.map1);

        this.ground1 = cc.Sprite.create("Ground01.png");
        this.ground1.setAnchorPoint(cc.p(0, 0));
        this.ground1.setPosition(cc.p(this.spriteWidth, g_groundHight - size.height));
        this.layer.addChild(this.ground1);
    },

    getMapWidth:function () {
        return this.spriteWidth;
    },

    getCurMap:function () {
        return this.curMap;
    },

    checkAndReload:function (eyeX) {
        var newCur = parseInt(eyeX / this.spriteWidth);
        if (this.curMap == newCur) {
            return false;
        }

        var map;
        var ground;
        if (0 == newCur % 2) {
            // change mapSecond
            map = this.map1;
            ground = this.ground1;
        } else {
            // change mapFirst
            map = this.map0;
            ground = this.ground0;
        }
        log("==load map:" + (newCur + 1));
        this.curMap = newCur;

        // load curMap + 1
        var fileName = "Map" + FormatNumberLength((newCur + 1) % this.mapCount, 2) + ".png";
        var texture = cc.TextureCache.getInstance().addImage(fileName);
        map.setTexture(texture);
        map.setPositionX(this.spriteWidth * (newCur + 1));

        // load ground
        var fileName = "Ground" + FormatNumberLength((newCur + 1) % this.mapCount, 2) + ".png";
        var texture = cc.TextureCache.getInstance().addImage(fileName);
        ground.setTexture(texture);
        ground.setPositionX(this.spriteWidth * (newCur + 1));
        return true;
    },
});

