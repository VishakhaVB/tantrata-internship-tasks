// --- Constants & State ---
const API_URL = 'http://localhost:5000/api';
let formData = {
    name: '',
    mobile: '',
    email: '',
    city: '',
    preference: ''
};
let isMobileVerified = false;
let isEmailVerified = false; // To track simulated email verification

// --- DOM Elements ---
const formSteps = {
    1: document.getElementById('step-1'),
    2: document.getElementById('step-2'),
    3: document.getElementById('step-3'),
    4: document.getElementById('step-4'),
    5: document.getElementById('step-5')
};
const stepIndicators = document.querySelectorAll('.steps-container .step');

// --- Navigation Flow ---
function goToStep(stepNum) {
    // Hide all steps
    Object.values(formSteps).forEach(el => el.classList.add('hidden'));

    // Show target step
    formSteps[stepNum].classList.remove('hidden');
    formSteps[stepNum].classList.add('active'); // for animation

    // Update Indicators
    stepIndicators.forEach(el => {
        const s = parseInt(el.getAttribute('data-step'));
        el.classList.remove('active', 'completed');
        if (s === stepNum) el.classList.add('active');
        if (s < stepNum) el.classList.add('completed');
    });
}

// --- Helper to handle API calls with Mock Fallback ---
async function apiCall(endpoint, method, body, mockAction) {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return await res.json();
    } catch (err) {
        console.warn(`[Backend Offline] Switching to Mock for ${endpoint}`);
        alert('Backend unreachable! Switching to Demo Mode (Mock Data). check console for OTP.');
        return mockAction();
    }
}

// --- Step 1: Basic Details -> Step 2: Mobile OTP ---
async function goToStep2() {
    const name = document.getElementById('fullname').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const errorEl = document.getElementById('mobile-error');

    if (!name) { alert('Please enter your full name'); return; }
    if (!mobile || mobile.length !== 10) {
        errorEl.textContent = 'Please enter a valid 10-digit mobile number';
        return;
    }

    errorEl.textContent = '';

    // Trigger Server OTP
    const btn = document.querySelector('#step-1 button');
    setLoading(btn, true);

    const mockResponse = () => {
        console.log(`[MOCK MOBILE OTP] 123456 for ${mobile}`);
        return { success: true, message: 'Mock OTP sent' };
    };

    const data = await apiCall('/otp/mobile/send', 'POST', { mobile }, mockResponse);

    setLoading(btn, false);

    if (data && data.success) {
        formData.name = name;
        formData.mobile = mobile;
        document.getElementById('display-mobile').textContent = mobile;
        goToStep(2);
        focusOtp('mobile-otp');
    } else {
        errorEl.textContent = data ? data.message : 'Failed to send OTP';
    }
}

// --- Step 2: Verify Mobile -> Step 3: Email ---
async function verifyMobileStep() {
    const otp = getOtpValue('mobile-otp');
    const errorEl = document.getElementById('otp-error');

    if (otp.length !== 6) { errorEl.textContent = 'Enter 6-digit OTP'; return; }

    const btn = document.querySelector('#step-2 button');
    setLoading(btn, true);

    const mockResponse = () => {
        if (otp === '123456') return { success: true };
        return { success: false, message: 'Invalid Mock OTP (Use 123456)' };
    };

    const data = await apiCall('/otp/mobile/verify', 'POST', { mobile: formData.mobile, otp }, mockResponse);

    setLoading(btn, false);

    if (data && data.success) {
        isMobileVerified = true;
        goToStep(3);
    } else {
        errorEl.textContent = data ? data.message : 'Invalid OTP';
    }
}

function backToStep1() {
    goToStep(1);
}

// --- Step 3: Email Verification (MOCKED) ---
// Note: Backend strictly does not support Email OTP routes.
// This is a simulated flow to meet UI/UX requirements.

let simulatedEmailOtp = null;

function sendEmailStep() {
    const email = document.getElementById('email').value.trim();
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }

    // Simulate sending OTP
    simulatedEmailOtp = '123456';
    formData.email = email;

    // UI Transition
    const btn = document.querySelector('#email-input-view button');
    setLoading(btn, true);

    setTimeout(() => {
        setLoading(btn, false);
        document.getElementById('email-input-view').classList.add('hidden');
        document.getElementById('email-otp-view').classList.remove('hidden');
        console.log(`[MOCK EMAIL SERVER] Sent OTP ${simulatedEmailOtp} to ${email}`);
        alert(`(Mock) Email OTP sent! Check console. OTP is ${simulatedEmailOtp}`);
        focusOtp('email-otp');
    }, 1500);
}

function verifyEmailStep() {
    const otp = getOtpValue('email-otp');
    const errorEl = document.getElementById('email-otp-error');

    // Simulate Verification
    if (otp === simulatedEmailOtp) {
        isEmailVerified = true;
        goToStep(4);
    } else {
        errorEl.textContent = 'Invalid Email OTP (Try 123456)';
    }
}

function skipEmailStep() {
    formData.email = '';
    isEmailVerified = false;
    goToStep(4);
}

// --- Step 4: Final Details -> Submit ---
async function submitRegistration() {
    const city = document.getElementById('city').value.trim();
    const preference = document.getElementById('preference').value;

    if (!city) { alert('Please enter your city'); return; }

    formData.city = city;
    // preference is just for UI

    // Prevent submit if logic requirements not met
    if (!isMobileVerified) { alert('Mobile verification required'); return; }

    const btn = document.getElementById('final-submit-btn');
    setLoading(btn, true);

    // Prepare Payload
    const payload = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        city: formData.city
    };

    const mockResponse = () => {
        const mockId = 'CREDAI-EXP-MOCK-' + Math.floor(1000 + Math.random() * 9000);
        return { success: true, registrationId: mockId };
    };

    const data = await apiCall('/registrations', 'POST', payload, mockResponse);

    setLoading(btn, false);

    if (data && data.success) {
        document.getElementById('ticket-id').textContent = data.registrationId;
        goToStep(5);
    } else {
        alert('Registration Failed: ' + (data ? data.message : 'Unknown error'));
    }
}

// --- Helpers ---
function setLoading(btn, isLoading) {
    if (isLoading) {
        btn.dataset.text = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;
    } else {
        btn.innerHTML = btn.dataset.text || 'Submit';
        btn.disabled = false;
    }
}

function getOtpValue(className) {
    const inputs = document.querySelectorAll(`.${className}`);
    return Array.from(inputs).map(i => i.value).join('');
}

function focusOtp(className) {
    const inputs = document.querySelectorAll(`.${className}`);
    if (inputs.length > 0) inputs[0].focus();

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
        // Paste support
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
            if (text) {
                const chars = text.split('');
                inputs.forEach((inp, i) => {
                    if (chars[i]) inp.value = chars[i];
                });
                // Focus last filled
                const lastIdx = Math.min(chars.length, inputs.length) - 1;
                if (lastIdx >= 0) inputs[lastIdx].focus();
            }
        });
    });
}

// Mobile Input Restrict
document.getElementById('mobile').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '');
});

// Initialize
goToStep(1);

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
