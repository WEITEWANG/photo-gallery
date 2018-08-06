require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
// 解析json文件中图片
let imgsData=require('../data/imageDatas.json');
imgsData=(function getImgsUrl(imgsDataArr){
  imgsData.forEach((val,index) => {
    let imgSingleData=val;
    imgSingleData.imgUrl=require('../images/'+val.fileName);
    val=imgSingleData;
  });
  return imgsDataArr;
})(imgsData);
// 定义图片组件
class ImageFigure extends React.Component{
  constructor(props){
    super(props);
    
  }
  render(){
    return (
      <figure className="img-figure">
        <img src={this.props.data.imgUrl} alt={this.props.data.desc} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
class AppComponent extends React.Component {
  constructor(props){
    super(props);
    // 图片位置初始化
    this.Constant={
      centerPos:{
        left:0,
        top:0
      },
      // 水平方向图片位置初始信息
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        topY:[0,0]
      },
      // 垂直方向图片位置初始信息
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }
    }
    this.state={
      imgsArrageArr:{
        pos:{
          left:0,
          top:0
        }
      }
    }
  }
   /*
  *利用rearrange函数，居中对应的index图片
  *@param index,需要被居中的图片对应的图片信息数组的index值
  *@return {function}
  */
//  rerrange(centerIndex){

//  }
  render() {
    let imgFigures=[],controllerUnits=[];
    imgsData.forEach((value,index)=>{
      imgFigures.push(<ImageFigure key={index} data={value} />);
    });
    
    return (
      <section className="stage">
        <section className="img-sec">{imgFigures}</section>
        <nav className="conroller-nav">{controllerUnits}</nav>
      </section>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
