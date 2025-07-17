import { resend } from 'resend';
import { RESEND_API_KEY } from './constants.js';

const resendConfig = new resend(RESEND_API_KEY);

export { resendConfig as resend };