import type { Ref } from 'vue';
import type { FormItemRule } from 'naive-ui';
import { REGEXP_CODE_SIX, REGEXP_EMAIL, REGEXP_PHONE, REGEXP_PWD } from '@/config';

/** 사용자 정의 오류 메시지에 대한 필수 필기 양식 규칙 작성 */
export const createRequiredFormRule = (message = '비어있을 수 없습니다'): FormItemRule => ({ required: true, message });

export const requiredFormRule = createRequiredFormRule();

/** 양식 규칙 */
interface CustomFormRules {
  /** 핸드폰 번호 */
  phone: FormItemRule[];
  /** 비밀번호 */
  pwd: FormItemRule[];
  /** 확인 코드 */
  code: FormItemRule[];
  /** 우편 */
  email: FormItemRule[];
}

/** 양식 규칙 */
export const formRules: CustomFormRules = {
  phone: [
    createRequiredFormRule('전화 번호를 입력하십시오'),
    { pattern: REGEXP_PHONE, message: '전화 번호의 잘못된 형식', trigger: 'input' }
  ],
  pwd: [
    createRequiredFormRule('비밀번호를 입력하십시오'),
    { pattern: REGEXP_PWD, message: '비밀번호6-18피터 번호/캐릭터/기호，적어도2콤비네이션合', trigger: 'input' }
  ],
  code: [
    createRequiredFormRule('확인 코드를 입력하십시오'),
    { pattern: REGEXP_CODE_SIX, message: '확인 코드 형식 오류', trigger: 'input' }
  ],
  email: [{ pattern: REGEXP_EMAIL, message: '이메일 형식 오류', trigger: 'blur' }]
};

/** 빈 문자열인지 여부 */
function isBlankString(str: string) {
  return str.trim() === '';
}

/** 확인 암호의 양식 규칙을 가져옵니다 */
export function getConfirmPwdRule(pwd: Ref<string>) {
  const confirmPwdRule: FormItemRule[] = [
    { required: true, message: '확인 암호를 입력하십시오' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== pwd.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: '입력 값은 비밀번호와 일치하지 않습니다',
      trigger: 'input'
    }
  ];
  return confirmPwdRule;
}

/** 获取图片验证码的表单规则 */
export function getImgCodeRule(imgCode: Ref<string>) {
  const imgCodeRule: FormItemRule[] = [
    { required: true, message: '请输入验证码' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== imgCode.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: '验证码不正确',
      trigger: 'blur'
    }
  ];
  return imgCodeRule;
}
