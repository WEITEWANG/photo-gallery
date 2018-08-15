require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
// let yeomanImage = require('../images/yeoman.png');
// 解析json文件中图片
let imgsData=require('../data/imageDatas.json');
imgsData=(function getImgsUrl(imgsDataArr){
  imgsData.forEach(val => {
    let imgSingleData=val;
    imgSingleData.imgUrl=require('../images/'+val.fileName);
    val=imgSingleData;
  });
  return imgsDataArr;
})(imgsData);
// 获取区间内的一个随机值
var getRangeRandom=(low,high)=>Math.floor(Math.random()*(high-low)+low);
// 倾斜角度30deg左右
var get30DegRandom=()=>{
  return((Math.random()>0.5?'':'-')+Math.floor(Math.random()*30));
};
// 定义图片组件
class ImageFigure extends React.Component{
  constructor(props){
    super(props);
    
  }
  render(){
    let styleObj={};
    if(this.props.arrange.pos){
      styleObj=this.props.arrange.pos;
    }
    if(this.props.arrange.rotate){
      (['MozTransform','MsTransform','WebkitTransform','transform']).forEach(val=>{
        styleObj[val]='rotate('+this.props.arrange.rotate+'deg)';
      });
    }
    return (
      <figure className="img-figure" style={styleObj}>
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
      imgsArrangeArr:[
      //   {
      //   pos:{
      //     left:0,
      //     top:0
      //   },
      // rotate:0
      // }
    ]
    }
  }
  center(index){
    return ()=>{
      this.rerrange(index);
    };
  }
   /*
  *利用rearrange函数，居中对应的index图片
  *@param index,需要被居中的图片对应的图片信息数组的index值
  *@return {function}
  */
// 重新布局所有图片
 rerrange(centerIndex){
  let imgsArrangeArr=this.state.imgsArrangeArr,
      Constant=this.Constant,
      // 中心图片的位置坐标信息
      centerPos=Constant.centerPos,
      hPosRange=Constant.hPosRange,
      leftSecX=hPosRange.leftSecX,
      rightSecX=hPosRange.rightSecX,
      hPosRangeTopY=hPosRange.topY,
      vPosRange=Constant.vPosRange,
      vPosRangeX=vPosRange.x,
      vPosRangeTopY=vPosRange.topY,
      // 定义中心位置图片
      imgArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1),
      // 上侧区域图片的张数在1张内
      imgsArrangeTopArr=[],
      // 上侧区域图片的图片索引
      topImgSpliceIndex=0,
      topImgNum=Math.floor(Math.random()*2);
      // 居中中心图片centerIndex图片，centerIndex的图片不需要旋转
      imgArrangeCenterArr[0]={
        pos:centerPos
      }
      // 上侧区域图片索引
      topImgSpliceIndex=Math.floor(Math.random()*(imgsArrangeArr.length-topImgNum));
      imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
      // 布局上侧图片位置信息
      imgsArrangeTopArr.forEach((val,index)=>{
          imgsArrangeTopArr[index]={
            pos:{
             top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
             left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate:get30DegRandom()
          }
      });
      // 布局两侧图片位置
      for(let i=0;i<imgsArrangeArr.length;i++){
        let hPosRangeLORX=null;
        if(i<imgsArrangeArr.length/2){
          hPosRangeLORX=leftSecX;
        }else{
          hPosRangeLORX=rightSecX;
        }
        imgsArrangeArr[i]={
          pos:{
            left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1]),
            top:getRangeRandom(hPosRangeTopY[0],hPosRangeTopY[1])
          },
          rotate:get30DegRandom()
        }
      }
      // 填充上侧区域
      if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
        imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
      }
      // 填充中心位置区域
      imgsArrangeArr.splice(centerIndex,0,imgArrangeCenterArr[0]);
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });
    }
  // 组件渲染出来，获取stage的高度
  componentDidMount(){
    let stageDOM=ReactDOM.findDOMNode(this.refs.stage),
    // console.log(stageDOM);
    // 获取stage的宽度
    stageWidth=stageDOM.scrollWidth,
    stageHeight=stageDOM.scrollHeight,
    halfStageWidth=stageWidth/2,
    halfStageHeight=stageHeight/2;
    // 获取每张图片的宽高
    let imgFigDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
    imgFigWidth=imgFigDOM.scrollWidth,
    imgFigHeight=imgFigDOM.scrollHeight,
    halfImgFigWidth=imgFigWidth/2,
    halfImgFigHeight=imgFigHeight/2;
    // 中心图片位置
    this.Constant.centerPos={
      left:halfStageWidth-halfImgFigWidth,
      top:halfStageHeight-halfImgFigHeight
    }
    // 水平方向图片的位置
    this.Constant.hPosRange.leftSecX[0]=-halfImgFigWidth;
    this.Constant.hPosRange.leftSecX[1]=halfStageWidth-halfImgFigWidth*3;
    this.Constant.hPosRange.rightSecX[0]=halfStageWidth+halfImgFigWidth;
    this.Constant.hPosRange.rightSecX[1]=stageWidth-halfImgFigWidth;
    this.Constant.hPosRange.topY[0]=-halfImgFigHeight;
    this.Constant.hPosRange.topY[1]=stageHeight-halfImgFigHeight;
    // 垂直方向图片位置的取值范围
    this.Constant.vPosRange.x[0]=halfStageWidth-imgFigWidth;
    this.Constant.vPosRange.x[1]=halfStageWidth;
    this.Constant.vPosRange.topY[0]=-halfImgFigHeight;
    this.Constant.vPosRange.topY[1]=halfStageHeight-halfImgFigHeight;
    this.rerrange(0);
  }
  render() {
    console.log(this);
    let imgFigures=[],controllerUnits=[];
    imgsData.forEach((val,index)=>{
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          },
          rotate:0
        }
      }
    })
  
    imgsData.forEach((value,index)=>{
      imgFigures.push(<ImageFigure key={index} data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} center={this.center(index)}/>);
    });
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">{imgFigures}</section>
        <nav className="conroller-nav">{controllerUnits}</nav>
      </section>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
