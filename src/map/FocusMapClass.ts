export class FocusMapClass {
    init (element:string, url:string){
        url = url || 'http://124.133.19.202:18090/iserver/services/3D-local3DCache-huanghedadaowubiaoduan220704/rest/realspace';
        // @ts-ignore
        var viewer = new Cesium.Viewer(element, {infoBox:false});
        //使用本地的一张图片初始化地球，建议图片长宽比2:1
        // viewer.imageryLayers.addImageryProvider(
        //     // @ts-ignore
        //     new Cesium.SingleTileImageryProvider({
        //         url: img ?  img : "../images/worldimage.jpg",
        //     })
        // );

        var scene = viewer.scene;
        scene.open(url);
    }
}