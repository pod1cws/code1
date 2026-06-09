// ============================================================
// EMAILSERVICE.GS — Gmail Auto-Email to L0 on Resolution
// ============================================================

function sendResolutionEmail(data) {
  try {
    const subject = `[CRX Resolution] Extension ${data.extensionId} — Doubt ${data.doubtId}`;

//     const htmlBody = `
// <!DOCTYPE html>
// <html>
// <head>
//   <style>
//     body { font-family: 'Google Sans', Arial, sans-serif; color: #202124; margin: 0; padding: 0; }
//     .container { max-width: 600px; margin: 0 auto; }
//     .header { background: #1a73e8; padding: 24px 32px; }
//     .header h1 { color: white; margin: 0; font-size: 20px; }
//     .header p { color: #e8f0fe; margin: 4px 0 0; font-size: 13px; }
//     .body { padding: 24px 32px; background: #fff; }
//     .field { margin-bottom: 20px; }
//     .field label { font-size: 11px; font-weight: 600; color: #5f6368; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
//     .field .value { font-size: 14px; color: #202124; background: #f8f9fa; padding: 10px 14px; border-radius: 6px; border-left: 3px solid #1a73e8; }
//     .verdict { background: #e6f4ea; border-left: 3px solid #34a853 !important; }
//     .footer { background: #f8f9fa; padding: 16px 32px; border-top: 1px solid #e8eaed; }
//     .footer p { font-size: 12px; color: #80868b; margin: 0; }
//     .badge { display: inline-block; background: #e8f0fe; color: #1a73e8; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>✅ Your Doubt Has Been Resolved</h1>
//       <p>Chrome Extensions Review (CRX) Team Response</p>
//     </div>
//     <div class="body">
//       <p>Hi <strong>${data.l0Name}</strong>,</p>
//       <p>Your doubt has been reviewed and resolved by the CRX team. Below are the details:</p>

//       <div class="field">
//         <label>Doubt ID</label>
//         <div class="value"><span class="badge">${data.doubtId}</span></div>
//       </div>

//       <div class="field">
//         <label>Extension ID</label>
//         <div class="value">${data.extensionId}</div>
//       </div>

      

//       <div class="field">
//         <label>Your Original Doubt</label>
//         <div class="value">${data.doubtDetails}</div>
//       </div>

//       <div class="field">
//         <label>CRX Clarification</label>
//         <div class="value">${data.clarification}</div>
//       </div>

//       <div class="field">
//         <label>Final Verdict</label>
//         <div class="value verdict"><strong>${data.finalVerdict}</strong></div>
//       </div>

//       <div class="field">
//         <label>Resolved By</label>
//         <div class="value">👤 ${data.resolvedBy}</div>
//       </div>
//     </div>
//     <div class="footer">
//       <p>This is an automated message from the CRX Doubt Management System. Please do not reply to this email.</p>
//       <p style="margin-top:8px;">Chrome Extensions Review Team · Google</p>
//     </div>
//   </div>
// </body>
// </html>`;

  const supervisorEmail = data.supervisor ? data.supervisor + '@google.com': '';
  const htmlBody = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>
<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; color: #2d2d2d;">
  <p style="font-size: 16px;">Hi <strong>${data.l0Name}</strong>,</p>
  <p style="font-size: 15px;">📬 Please find the final response regarding your query below:</p>
  <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
    <thead>
      <tr style="background-color: #2980b9; color: #ecf0f1;">
        <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">📌 Field</th>
        <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">📄 Details</th>
      </tr>
    </thead>
    <tbody>
      ${createRow('🔑 Reviewer LDAP',                        data.l0Name,             0, 'color: #3498db; font-weight: bold;')}
      ${createRow('📍 POD',                                  data.pod,                1, 'color: #27ae60; font-weight: bold;')}
      ${createRow('👤 Supervisor',                           data.supervisor,         2, 'color: #8e44ad; font-weight: bold;')}
      ${createRow('🆔 Extension ID',                         data.extensionId,        3, '')}
      ${createRow('✅ Final Verdict',                        data.finalVerdict,       4, 'color: green; font-weight: bold;')}
      ${createRow('📝 CRX Team Justification',               data.clarification,      5, '')}
      ${createRow('📈 L0 Area of Improvement',               data.l0Improvement,      6, '')}
      ${createRow('💬 Additional Comments/Recommendations',  data.additionalComments, 7, '')}
      ${createRow('🔍 Type of Consult (Easy/Medium/Complex)',data.typeOfConsult,       8, getTypeOfConsultStyle(data.typeOfConsult))}
      ${createRow('🛠️ Approach Validation',                  data.approachValidation, 9, getApproachValidationStyle(data.approachValidation))}
      ${createRow('👤 CRX Validator',                        data.resolvedBy,        10, 'color: #4B0082; font-weight: bold;')}
    </tbody>
  </table>
  <p style="margin-top: 20px; font-size: 14px;">Regards,<br><strong>CWS ACN CRX Team</strong></p>
</div>
</body>
</html>`;

    const emailOptions = {
      name: 'CRX Team',
      bcc: 'shmodem@google.com, abhilashnukala@google.com',
      htmlBody: htmlBody
    };

    if(supervisorEmail) {
      emailOptions.cc = supervisorEmail;
    }

    GmailApp.sendEmail(data.l0Email,subject,'',emailOptions);

  } catch (err) {
    Logger.log('Email send error: ' + err.message);
  }
}

function createRow(label, value, index, overrideStyle = '') {
  const bgColor = index % 2 === 0 ? '#f4f6f8' : '#e1e8f0';
  const colorStyle = overrideStyle || '';
  
  return ` 
    <tr style="background-color: ${bgColor};">
      <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600;">${label}</td>
      <td style="padding: 12px; border: 1px solid #ddd; ${colorStyle}">${value !== undefined ? value : ''}</td>
    </tr>
  `;
}

function getTypeOfConsultStyle(value) {
  if (!value || typeof value !== 'string') return '';
  const val = value.toLowerCase().trim();
  if (val === 'easy') return 'color: green; font-weight: bold;';
  if (val === 'medium') return 'color: orange; font-weight: bold;';
  if (val === 'complex') return 'color: red; font-weight: bold;';
  return '';
}

function getApproachValidationStyle(value) {
  if (!value || typeof value !== 'string') return '';
  const val = value.toLowerCase().trim();
  if (val === 'valid') return 'color: green; font-weight: bold;';
  if (val === 'invalid') return 'color: red; font-weight: bold;';
  return '';
}
