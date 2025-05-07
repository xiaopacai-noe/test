import axios from "axios";
import sourceMap from "source-map-js";
const getSourceMap = async (url) => {
  const res = await axios.get(url);
  return res.data;
};
const findCodeBySourceMap = async (stackFrame) => {
  console.log("%c [ stackFrame ]-7", "font-size:13px; background:pink; color:#bf2c9f;", stackFrame);
  //获取map文件
  const sourceMap = await getSourceMap(stackFrame.filename + ".map");
  //解析map文件
  const consumer = await new sourceMap.SourceMapConsumer(sourceMap);
  //获取源码
  const originalPosition = consumer.originalPositionFor({
    line: stackFrame.lineNumber,
    column: stackFrame.columnNumber,
  });
  const errorCode = consumer.sourceContentFor(originalPosition.source);
  console.log('%c [ errorCode ]-19', 'font-size:13px; background:pink; color:#bf2c9f;', errorCode)
  return errorCode;
};

export { findCodeBySourceMap };