/**
 *
 * 주어진 체중(kg)과 신장(cm)을 사용하여 표준 BMI를 계산합니다.
 * 공식: BMI = 체중(kg) / (신장(m) ^ 2)
 *
 * @param {number} weightKg - 체중(kg).
 * @param {number} heightCm - 신장(cm).
 * @returns {number} 계산된 BMI 값 (소수점 둘째 자리까지 반올림).
 *
 * @example
 * const bmi = calculateStandardBMI(70, 175); // 70kg 체중과 175cm 신장을 기준으로 BMI 계산
 * console.log(bmi); // 계산된 BMI 값 출력
 */
export const calculateStandardBMI = (weightKg: number, heightCm: number): null | number => {
  if (isNaN(weightKg) || weightKg <= 0 || isNaN(heightCm) || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  return parseFloat((weightKg / Math.pow(heightM, 2)).toFixed(2));
};

/**
 * 주어진 BMI와 신장(cm)을 사용하여 체중(kg)을 계산합니다.
 * 공식: 체중(kg) = BMI * (신장(m) ^ 2)
 *
 * @param {number} bmi - BMI 값.
 * @param {number} heightCm - 신장(cm).
 * @returns {number} 계산된 체중(kg) (소수점 둘째 자리까지 반올림).
 *
 * @example
 * const weight = calculateStandardToWeightKg(22.5, 175); // BMI 22.5와 175cm 신장을 기준으로 체중 계산
 * console.log(weight); // 계산된 체중 값 출력
 */
export const calculateStandardToWeightKg = (bmi: number, heightCm: number): null | number => {
  if (isNaN(bmi) || bmi <= 0 || isNaN(heightCm) || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  return parseFloat((bmi * Math.pow(heightM, 2)).toFixed(2));
};

/**
 * 주어진 체중(kg)과 신장(cm)을 사용하여 수정된 BMI를 계산합니다.
 * 공식: BMI = 1.3 * 체중(kg) / (신장(m) ^ 2.5)
 *
 * @param {number} weightKg - 체중(kg).
 * @param {number} heightCm - 신장(cm).
 * @returns {number} 계산된 BMI 값 (소수점 둘째 자리까지 반올림).
 *
 * @example
 * const bmi = calculateNewBMI(70, 175); // 70kg 체중과 175cm 신장을 기준으로 BMI 계산
 * console.log(bmi); // 계산된 BMI 값 출력
 */
export const calculateNewBMI = (weightKg: number, heightCm: number): null | number => {
  if (isNaN(weightKg) || weightKg <= 0 || isNaN(heightCm) || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  return parseFloat(((1.3 * weightKg) / Math.pow(heightM, 2.5)).toFixed(2));
};

/**
 * 주어진 BMI와 신장(cm)을 사용하여 체중(kg)을 계산하는 수정된 방식.
 * 공식: 체중(kg) = (BMI / 1.3) * (신장(m) ^ 2.5)
 *
 * @param {number} bmi - BMI 값.
 * @param {number} heightCm - 신장(cm).
 * @returns {number} 계산된 체중(kg) (소수점 둘째 자리까지 반올림).
 *
 * @example
 * const weight = calculateNewToWeightKg(22.86, 175); // BMI 22.86과 175cm 신장을 기준으로 체중 계산
 * console.log(weight); // 계산된 체중 값 출력
 */
export const calculateNewToWeightKg = (bmi: number, heightCm: number): null | number => {
  if (isNaN(bmi) || bmi <= 0 || isNaN(heightCm) || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  return parseFloat(((bmi / 1.3) * Math.pow(heightM, 2.5)).toFixed(2));
};

export const result_kosso_bmi = (bmi: number) => {
  switch (true) {
    case bmi <= 0 || isNaN(bmi):
      return "입력값 오류";
    case bmi < 18.5:
      return `저체중 (BMI: ${bmi})`;
    case bmi >= 18.5 && bmi <= 22.9:
      return `정상체중 (BMI: ${bmi})`;
    case bmi >= 23 && bmi <= 24.9:
      return `비만 전 단계 (BMI: ${bmi})`;
    case bmi >= 25 && bmi <= 29.9:
      return `비만 1단계 (BMI: ${bmi})`;
    case bmi >= 30 && bmi <= 34.9:
      return `비만 2단계 (BMI: ${bmi})`;
    case bmi >= 35:
      return `비만 3단계 (BMI: ${bmi})`;
    default:
      return null;
  }
};

export const result_who_bmi = (bmi: number) => {
  switch (true) {
    case bmi <= 0 || isNaN(bmi):
      return "입력값 오류";
    case bmi < 16:
      return `저체중 / 심각한 마른 체형 (BMI: ${bmi})`;
    case bmi >= 16 && bmi <= 16.9:
      return `저체중 / 적당히 마른 체형 (BMI: ${bmi})`;
    case bmi >= 17 && bmi <= 18.4:
      return `저체중 / 약간 마른 체형 (BMI: ${bmi})`;
    case bmi >= 18.5 && bmi <= 24.9:
      return `정상체중 (BMI: ${bmi})`;
    case bmi >= 25 && bmi <= 29.9:
      return `비만 전 단계 (BMI: ${bmi})`;
    case bmi >= 30 && bmi <= 34.9:
      return `비만 1단계 (BMI: ${bmi})`;
    case bmi >= 35 && bmi <= 39.9:
      return `비만 2단계 (BMI: ${bmi})`;
    case bmi >= 40:
      return `비만 3단계 (BMI: ${bmi})`;
    default:
      return null;
  }
};

/*
22 /  기준으로 작성되었습니다.

Current formula: BMI = weight(kg)/height(m)^2 = 703*weight(lb)/height(in)^2.
New formula: BMI = 1.3*weight(kg)/height(m)^2.5 = 5734*weight(lb)/height(in)^2.5

Anthropometric
국제 WHO BMI 임계값(16, 17, 18.5, 25, 30, 35 및 40)과 위험에 처한 아시아인의 경우 추가적으로 4개의 임계값(23, 27.5, 32.5 및 37.5)이 확인되었습니다. [
ABSI = 허리둘레 / (BMI^(2/3) * 신장^(1/2))
체지방률(%) = 1.20 * BMI + 0.23 * 나이 - 10.8 * 성별 - 5.4
     IMG = (1.2 × BMI) + (0.23 × age) - (10.8 × S) - 5,4,

1.2 * BMI + 0.23 * 나이 - 10.8 * 성별(남성=1, 여성=0) - 5.4
1.5 * BMI - 0.7 * 나이 - 3.6 * 성별(남성=1, 여성=0) + 1.4

  넌 진짜 이기적이니까....
  

1. 1단계 : 표준 제지방량 계산법


  1) 남성
  표준 제지방량(kg) = (1.10 x 체중(kg)) - (128 x (체중(kg)^2 / 키(cm)^2))

  2) 여성 
  표준 제지방량(kg) = (1.07 x 체중(kg)) - (128 x (체중(kg)^2 / 키(cm)^2))

  2. 2단계 : 체지방량 계산법
  체지방량(kg) = 체중(kg) - 표준 제지방량(kg)


3. 3단계 : 체지방률 계산법
체지방률(%) = (체지방량(kg) x 100) / 체중(kg)
[출처] 체지방률 BMI 지수 체질량 정상 여자 남자 계산하기 체지방 줄이는법 시네트롤|작성자 도이씨

총선개입 단일화개입 공천개입 불볍여론조사 최순실이 선녀라고 

view-source:https://people.maths.ox.ac.uk/trefethen/bmi_calc.html

export const categoryBMI2018 = (bmi: number) => {
  switch (true) {
    case bmi < 0:
      return "잘못된 입력값";
    case bmi < 18.5:
      return `저체중 (BMI: ${bmi})`;
    case bmi >= 18.5 && bmi <= 22.9:
      return `정상체중 (BMI: ${bmi})`;
    case bmi >= 23 && bmi <= 24.9:
      return `비만 전 단계(과체중 or 위험체중) (BMI: ${bmi})`;
    case bmi >= 25 && bmi <= 29.9:
      return `비만 (1단계) (BMI: ${bmi})`;
    case bmi >= 30 && bmi <= 34.9:
      return `비만 (2단계) (BMI: ${bmi})`;
    case bmi >= 35:
      return `비만 (3단계/고도비만) (BMI: ${bmi})`;
  }
};

        if (newBmi < 18.5){
            document.bmiForm.newmeaning.value = "underweight."
        }
        else if (newBmi >= 18.5 && newBmi < 25){
            document.bmiForm.newmeaning.value = "healthy."
        }
        else if (newBmi >= 25 && newBmi < 30){
            document.bmiForm.newmeaning.value = "overweight."
        }
        else if (newBmi >= 30){
            document.bmiForm.newmeaning.value = "obese."
        }

        if (oldBmi < 18.5){
            document.bmiForm.meaning.value = "underweight."
        }
        else if (oldBmi >= 18.5 && oldBmi < 25){
            document.bmiForm.meaning.value = "healthy."
        }
        else if (oldBmi >= 25 && oldBmi < 30){
            document.bmiForm.meaning.value = "overweight."
        }
        else if (oldBmi >= 30){
            document.bmiForm.meaning.value = "obese."
        }
https://en.wikipedia.org/wiki/Body_mass_index#Categories
https://people.maths.ox.ac.uk/trefethen/bmi_calc.html
https://www.mycalculators.net/health/bmi-calculator/new-bmi-calculator
https://faisalalware.github.io/bmi-calculator/

  // Calculate BMR as per Weight, Height & Age value
  const bmr = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)).toFixed(0);
  const maintainWeight = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age) + 250).toFixed(0);
  const moderateWeightLoss = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age) - 250).toFixed(0);
  const extremeWeightLoss = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age) - 500).toFixed(0);

  //Calculate AMR as per BMR value
  const sedentary = (bmr * 1.2).toFixed(0);
  const lightlyActive = (bmr * 1.375).toFixed(0);
  const moderatelyActive = (bmr * 1.55).toFixed(0);
  const active = (bmr * 1.725).toFixed(0);
  const veryActive = (bmr * 1.9).toFixed(0);


New BMI: 1.3 x weight(kg)/height(m)2.5
Standard BMI: weight(kg)/height(m)2
1.3*체중(kg)/신장(m)^2.5 

세계보건기구 기준으로 BMI가
 18.5 이하의 경우 저체중, 
 18.5 ~ 25의 경우 정상[6], 
 25 ~ 30의 경우 과체중, 
 30 ~ 35의 경우 I단계 비만, 
 35 ~ 40의 경우 II단계 비만, 
 40 이상의 경우 III단계 비만에 해당한다.[7]

기존에는 BMI가 
18.5 미만이면 저체중, 
18.5∼23은 정상, 
23~25이면 과체중, 
25∼30은 경도비만, 
30∼35는 중등도비만, 
35 이상이면 고도비만으로 구분했었으나, 

2018년 비만진료지침에서 단계별 용어가 새롭게 변경되어 
18.5 미만이면 저체중, 
18.5∼22.9는 정상, 
23 ~ 24.9는 비만 전 단계, 
25∼29.9는 '1단계 비만', 
30∼34.9는 '2단계 비만', 
35이상이면 '3단계 비만'으로 구분하며 이전에 사용하던 용어에 혼란을 주지 않기 위해 
비만 전 단계는 과체중으로,
 3단계 비만은 고도 비만으로 대체하여 부를 수 있다.


대한비만학회 2022년 기준
https://general.kosso.or.kr/html/?pmode=BBBS0001300003

https://www.hidoc.co.kr/healthstory/news/C0000374264

https://people.maths.ox.ac.uk/trefethen/bmi_calc.html

export const resultCategoryBMI = (bmi: number) => {
  switch (true) {
    case bmi < 0:
      return "잘못된 입력값";
    case bmi < 18.5:
      return `저체중 (BMI: ${bmi})`;
    case bmi >= 18.5 && bmi <= 24.9:
      return `정상체중 (BMI: ${bmi})`;
    case bmi >= 25 && bmi <= 29.9:
      return `과체중 (BMI: ${bmi})`;
    case bmi >= 30 && bmi <= 34.9:
      return `비만 (1단계) (BMI: ${bmi})`;
    case bmi >= 35 && bmi <= 39.9:
      return `고도비만 (2단계) (BMI: ${bmi})`;
    case bmi >= 40:
      return `초고도비만 (3단계) (BMI: ${bmi})`;
    default:
      return `유효하지 않은 BMI 값입니다.`;
  }
};
*/
