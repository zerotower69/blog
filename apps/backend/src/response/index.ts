export class Res {
  //统一结果格式：code,data,message
  static Result<D,C extends number>(code: C, data: D, message: string) {
    return {
      code,
      data,
      message,
    };
  }
  //成功返回
  static OK<D>(message = 'ok',code=200, data: D | null = null) {
    return Res.Result(code, data, message);
  }

  //成功返回，带数据
  static OKWithData<D>(data:D|null=null,message='ok',code=200){
    return Res.Result(code,data,message)
  }
  //成功返回分页数据
  static OKWithPage<D>(list: D[], page = 1, total = 0, message = 'ok') {
    return Res.Result(200, Res.Page(list, page, total), message);
  }
  //成功返回列表数据
  static OkWithList<D>(list: D[], message = 'ok') {
    return Res.Result(200, Res.List(list), message);
  }
  //错误返回
  static Error<D>(message: string = 'error',code=400, data: D | null = null) {
    return Res.Result(code, data, message);
  }

  //服务器错误
  static ServerError<D>(
    message: string = 'server error',
    code=500,
    data: D | null = null,
  ) {
    return Res.Result(code, data, message);
  }

  //分页数据
  static Page<D>(list: D[], page = 1, total = 0) {
    if (!total && list.length) {
      total = list.length;
    }
    return {
      list,
      page,
      total,
    };
  }

  //列表数据
  static List<D>(list: D[]) {
    const total = list.length;
    return {
      list,
      total,
    };
  }
}
