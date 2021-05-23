
import axios from 'axios';
//http请求
export function sendHttpRequest(URL, TYPE,HEADERS , PARAMS, EXTEND) {
  if (URL==''||URL==null||URL==undefined) return null;
  if (TYPE==''||TYPE==null||TYPE==undefined) return null;
  let axiosp = {
      url: URL,
      method: TYPE,
  };
  if (HEADERS!=''&&HEADERS!=null&&HEADERS!=undefined) axiosp.headers = HEADERS;
  if (PARAMS!=''&&PARAMS!=null&&PARAMS!=undefined) axiosp.data = PARAMS;
  if (EXTEND!=''&&EXTEND!=null&&EXTEND!=undefined) {
      (Object.keys(EXTEND) || []).map(ext => {
          axiosp[ext] = EXTEND[ext];
      });
  }
  return axios(axiosp);
};
