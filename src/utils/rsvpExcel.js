// Loaded only when an administrator requests an export.
export async function createRsvpWorkbook(dashboard, rows) {
  const { default: ExcelJS } = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'June & Rafael';
  workbook.created = new Date();

  function addSheet(name, headers, values, widths) {
    const sheet = workbook.addWorksheet(name, { views: [{ state: 'frozen', ySplit: 1 }] });
    sheet.columns = headers.map((header, index) => ({ header, width: widths[index] || 24 }));
    values.forEach((row) => sheet.addRow(row.map((value) => value ?? '')));
    sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: sheet.rowCount, column: headers.length } };
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF64714D' } };
    sheet.getRow(1).height = 30;
    sheet.eachRow((row) => { row.alignment = { vertical: 'top', wrapText: true }; });
    return sheet;
  }

  // Derive totals from the exported invitations, excluding uninvited events.
  const totals = new Map();
  rows.forEach((row) => {
    const total = totals.get(row.eventId) || { name: row.eventName, invited: 0, yes: 0, no: 0, pending: 0 };
    total.invited += 1;
    total[row.attending === 'Yes' ? 'yes' : row.attending === 'No' ? 'no' : 'pending'] += 1;
    totals.set(row.eventId, total);
  });
  addSheet('Event Summary', ['Event', 'Invited', 'Attending', 'Declined', 'Pending'],
    [...totals.values()].map((event) => [event.name, event.invited, event.yes, event.no, event.pending]), [40, 15, 15, 15, 15]);

  addSheet('Guest RSVPs',
    ['Invitation Group', 'Group Email', 'Guest', 'Guest Email', 'Plus One', 'Event', 'Attendance', 'Meal', 'Dietary Restrictions', 'Travel Notes', 'Arrival', 'Departure', 'Additional Notes', 'Updated At'],
    rows.map((row) => [row.householdName, row.primaryEmail, row.guestName, row.guestEmail, row.plusOneName, row.eventName, row.attending, row.mealPreference, row.dietaryRestrictions, row.travelNotes, row.arrivalDate, row.departureDate, row.additionalNotes, row.updatedAt]),
    [30, 36, 30, 36, 25, 38, 16, 24, 40, 40, 16, 16, 40, 28]);
  return workbook.xlsx.writeBuffer();
}

export async function downloadRsvpExcel(dashboard, rows) {
  const buffer = await createRsvpWorkbook(dashboard, rows);
  const url = URL.createObjectURL(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `june-rafael-rsvps-${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
