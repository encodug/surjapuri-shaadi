export function createOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
    return OTP;
}


export async function sendPostRequest(endpoint, data) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(data).length.toString(), 
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      console.error('API Error:', response.statusText);
      return { success: false, error: 'API Error: ' + response.statusText };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, error: 'Network Error: ' + error.message };
  }
}

export async function sendPostFormBodyRequest(endpoint, data) {
  if (!endpoint || !data) {
    return {
      success: false,
      error: 'Invalid request parameters. Both endpoint and data are required.',
    };
  }

  const formData = new FormData();
  for (const formDataKey in data ) {
    const valuesKey = data[formDataKey];
    formData.append(formDataKey, valuesKey);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      console.error('API Error:', response.statusText);
      return { success: false, error: 'API Error: ' + response.statusText };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, error: 'Network Error: ' + error.message };
  }
}

export async function fetchGetParamRequest(endpoint, value) {
  try {
    const response = await fetch(endpoint + value);
    if (response.status === 200) {
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      console.error('API Error:', response.statusText);
      return { success: false, error: 'API Error: ' + response.statusText }; 
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, error: 'Network Error: ' + error.message };
  }
}


export function calculateAge(dob) {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age if the current date hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  return age;
}

export function delay (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}