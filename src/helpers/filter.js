// 过滤所有空格、中文、emoji表情
export default class Filter {
  static toFilter(str) {
    if(str && str.length > 0) {
      return str.replace(/(\s)|(^\s+)|(\s+$)|([\u4e00-\u9fa5])|([\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030)/g, '')
    }
    return str
  }
}