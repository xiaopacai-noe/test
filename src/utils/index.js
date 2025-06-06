import axios from "axios";
import sourceMap from "source-map-js";
const getSourceMap = async (url) => {
  console.log('%c [ url ]-4', 'font-size:13px; background:pink; color:#bf2c9f;', url)
  const res = await axios.get(url);
  return res.data;
};
const findCodeBySourceMap = async (stackFrame) => {
  console.log("%c [ stackFrame ]-7", "font-size:13px; background:pink; color:#bf2c9f;", stackFrame.fileName);
  //获取map文件
  const fileContent = await getSourceMap(stackFrame.fileName + ".map");
  //解析map文件
  const consumer = await new sourceMap.SourceMapConsumer(fileContent);
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