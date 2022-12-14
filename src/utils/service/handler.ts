/** 통합 실패 및 성공 요청 결과의 데이터 유형 */
export async function handleServiceResult<T = any>(error: Service.RequestError | null, data: any) {
  if (error) {
    const fail: Service.FailedResult = {
      error,
      data: null
    };
    return fail;
  }
  const success: Service.SuccessResult<T> = {
    error: null,
    data
  };
  return success;
}

/** 요청 결과 어댑터 : 어댑터 기능을 받고 요청 결과를받는 데 사용됩니다. */
export function adapter<T extends Service.ServiceAdapter>(
  adapterFun: T,
  ...args: Service.MultiRequestResult<TypeUtil.GetFunArgs<T>>
): Service.RequestResult<ReturnType<T>> {
  let result: Service.RequestResult | undefined;

  const hasError = args.some(item => {
    const flag = Boolean(item.error);
    if (flag) {
      result = {
        error: item.error,
        data: null
      };
    }
    return flag;
  });

  if (!hasError) {
    const adapterFunArgs = args.map(item => item.data);
    result = {
      error: null,
      data: adapterFun(...adapterFunArgs)
    };
  }

  return result!;
}
