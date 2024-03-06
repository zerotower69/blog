export declare class Res {
    static Result<D>(code: number, data: D, message: string): {
        code: number;
        data: D;
        message: string;
    };
    static OK<D>(message?: string, data?: D | null): {
        code: number;
        data: D;
        message: string;
    };
    static OKWithPage<D>(list: D[], page?: number, total?: number, message?: string): {
        code: number;
        data: {
            list: D[];
            page: number;
            total: number;
        };
        message: string;
    };
    static OkWithList<D>(list: D[], message?: string): {
        code: number;
        data: {
            list: D[];
            total: number;
        };
        message: string;
    };
    static Error<D>(message?: string, data?: D | null): {
        code: number;
        data: D;
        message: string;
    };
    static ServerError<D>(message?: string, data?: D | null): {
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
