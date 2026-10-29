import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STORE_INFO,
  FESTIVAL_OFFER_PREFILL,
  buildWhatsAppUrl,
  validateEnquiryForm,
  formatEnquiryWhatsAppMessage,
  getNextGalleryIndex,
} from './enquiry';

test('buildWhatsAppUrl returns base URL when message is empty', () => {
  assert.equal(buildWhatsAppUrl(), 'https://wa.me/917982461161');
  assert.equal(buildWhatsAppUrl('   '), 'https://wa.me/917982461161');
});

test('buildWhatsAppUrl encodes exact Sleepwell festival offer prefill message', () => {
  const url = buildWhatsAppUrl(FESTIVAL_OFFER_PREFILL);
  assert.ok(url.startsWith('https://wa.me/917982461161?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.equal(
    decoded,
    'Hello Kanha Comforts Gallery! I would like to know about your latest Sleepwell mattress festival offers and available free gifts.'
  );
});

test('validateEnquiryForm rejects empty or invalid fields without fallback substitution', () => {
  const emptyResult = validateEnquiryForm({
    fullName: '',
    phone: '',
    productInterest: '',
    message: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.productInterest);
  assert.ok(emptyResult.errors.message);

  const shortPhoneResult = validateEnquiryForm({
    fullName: 'Riya Kapoor',
    phone: '12345',
    productInterest: 'Premium Mattresses',
    message: 'Looking for a king mattress.',
  });
  assert.equal(shortPhoneResult.valid, false);
  assert.ok(shortPhoneResult.errors.phone);
});

test('validateEnquiryForm accepts valid Indian phone formats and formats WhatsApp text cleanly', () => {
  const input = {
    fullName: 'Aarav Sharma',
    phone: '+91 98100 12345',
    productInterest: 'Premium Mattresses',
    message: 'Please share Sleepwell mattress options for a master bedroom.',
  };
  const validation = validateEnquiryForm(input);
  assert.equal(validation.valid, true);
  assert.deepEqual(validation.errors, {});

  const formatted = formatEnquiryWhatsAppMessage(input);
  assert.ok(formatted.includes(STORE_INFO.name));
  assert.ok(formatted.includes('Name: Aarav Sharma'));
  assert.ok(formatted.includes('Phone: +91 98100 12345'));
  assert.ok(formatted.includes('Interested In: Premium Mattresses'));
});

test('getNextGalleryIndex wraps around cleanly in both directions', () => {
  assert.equal(getNextGalleryIndex(0, 'prev', 6), 5);
  assert.equal(getNextGalleryIndex(5, 'next', 6), 0);
  assert.equal(getNextGalleryIndex(2, 'next', 6), 3);
  assert.equal(getNextGalleryIndex(2, 'prev', 6), 1);
});
