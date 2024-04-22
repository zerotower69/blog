export class Res {
  //统一结果格式：code,data,message
  static Result<D, C extends number>(code: C, data: D, message: string, type: ResponseType) {
    return {
      code,
      data,
      message,
      type,
    };
  }
  //成功返回
  static OK<D>(message = 'ok', code = 200, data: D | null = null) {
    return Res.Result(code, data, message, ResponseType.SUCCESS);
  }

  //成功返回，带数据
  static OKWithData<D>(data: D | null = null, message = 'ok', code = 200) {
    return Res.Result(code, data, message, ResponseType.SUCCESS);
  }
  //成功返回分页数据
  static OKWithPage<D>(items: D[], pageSize: number, page = 1, total = 0, code = 200, message = 'ok') {
    if (!total && items.length) {
      total = items.length;
    }
    const data = {
      items,
      pageSize,
      total,
      page,
    };
    return Res.Result(code, data, message, ResponseType.SUCCESS);
  }
  //成功返回列表数据
  static OkWithList<D>(list: D[], message = 'ok') {
    const data = {
      list: list,
      total: list.length,
    };
    return Res.Result(200, data, message, ResponseType.SUCCESS);
  }
  //错误返回
  static Error<D>(message: string = 'error', code = 400, data: D | null = null) {
    return Res.Result(code, data, message, ResponseType.ERROR);
  }

  //服务器错误
  static ServerError<D>(message: string = 'server error', code = 500, data: D | null = null) {
    return Res.Result(code, data, message, ResponseType.ERROR);
  }

  //分页数据
  static Page<D>(list: D[], limit: number, page = 1, total = 0, code = 200, message = 'ok') {
    if (!total && list.length) {
      total = list.length;
    }
    const data = {
      list,
      page,
      total,
      limit,
    };
    return Res.Result(code, data, message, ResponseType.SUCCESS);
  }

  //列表数据
  static List<D>(list: D[], message = 'ok', code = 200) {
    const total = list.length;
    const data = {
      list,
      total,
    };
    return Res.Result(code, data, message, ResponseType.SUCCESS);
  }

  //返回警告信息
  static Warn<D>(message: string, code: number, data: D) {
    return Res.Result(code, data, message, ResponseType.WARNING);
  }
}

export enum ResponseType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}
