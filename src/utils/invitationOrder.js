const normalizeName = (name = '') => name
  .normalize('NFD')
  .replace(/\p{M}/gu, '')
  .trim()
  .replace(/\s+/g, ' ')
  .toLocaleLowerCase();

export function orderInvitationGuests(guests = [], groupName = '') {
  const head = normalizeName(groupName);
  if (!head) return guests;
  const isHead = (guest) => normalizeName(guest.displayName || `${guest.firstName || ''} ${guest.lastName || ''}`) === head;
  // Preserve companion order and guest IDs; only move the named group head first.
  return [...guests.filter(isHead), ...guests.filter((guest) => !isHead(guest))];
}
