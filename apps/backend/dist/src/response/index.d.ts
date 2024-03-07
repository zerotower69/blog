export declare class Res {
    static Result<D, C extends number>(code: C, data: D, message: string): {
        code: C;
        data: D;
        message: string;
    };
    static OK<D>(message?: string, code?: number, data?: D | null): {
        code: number;
        data: D;
        message: string;
    };
    static OKWithData<D>(data?: D | null, message?: string, code?: number): {
        code: number;
        data: D;
        message: string;
    };
    static OKWithPage<D>(list: D[], page?: number, total?: number, message?: string): {
        code: 200;
        data: {
            list: D[];
            page: number;
            total: number;
        };
        message: string;
    };
    static OkWithList<D>(list: D[], message?: string): {
        code: 200;
        data: {
            list: D[];
            total: number;
        };
        message: string;
    };
    static Error<D>(message?: string, code?: number, data?: D | null): {
        code: number;
        data: D;
        message: string;
    };
    static ServerError<D>(message?: string, code?: number, data?: D | null): {
        code: number;
        data: D;
        message: string;
    };
    static Page<D>(list: D[], page?: number, total?: number): {
        list: D[];
        page: number;
        total: number;
    };
    static List<D>(list: D[]): {
        list: D[];
        total: number;
    };
}
