/**
 * @title
 * Email Service: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 28 2022, Kareem Sapi
 */

const config = require('config');
const mailgun = require('mailgun-js');
const logger = require('./logger');
const API_KEY = ""//config.get('mg.api');
const DOMAIN = ""//config.get('mg.domain');
const FRONTEND_DOMAIN = config.get('frontend.domain');

const mg = mailgun({
    apiKey: API_KEY, 
    domain: DOMAIN
});

exports.send_reset_password_email = function (email, fullName, token){

  const reset_password_url =`${FRONTEND_DOMAIN}/auth/reset-password?reset_password_token=${token}`;

  const data = {
      from: 'Msomiflix Support Team <support@msomiflix.com>',
      to: email,
      subject: "Reset Password",
      html: `Hello,` +
      '\nWe have received password reset request. ' +
      `To do this, please proceed at ${reset_password_url}` +
      '\nIf it wasn\'t you, take no action or contact support.' +
      '\n\nThank you,' +
      '\nSupport team.',
  };

  mg
  .messages()
  .send(data, function (error, body) {
    try {
      if(error){
        logger.error(error);
      } else {
        logger.info({ message: "Email sent successfully" });
      }
    } catch (e) {
      logger.error(e);
    }
  });
}//end sendEmailsAlerts

/** 
 @method : send verification email. 
 @brief : generate email to confirm user email. 
*/
exports.send_verification_email = function(email, fullName, token ) {

    const data = {
      from    : 'Msomiflix Email Verification <alerts@msomiflix.com>',
      to      : email,
      subject : 'Email Verification',
      html    : `<body class="em_body" style="margin:0px auto; padding:0px;" bgcolor="#1C3144">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center"  bgcolor="#1C3144">
          <tr>
            <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                <tr>
                  <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                    <tr>
                      <td height="25" style="height:25px;" class="em_h20">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center" valign="top"><a href="https://tekchurch.com" target="_blank" style="text-decoration:none;"><img src="" width="60" height="60" alt="tekChurch" border="0" style="display:block; font-family:Arial, sans-serif; font-size:18px; line-height:25px; text-align:center; color:#1d4685; font-weight:bold; max-width:208px;" class="em_w150" /></a></td>
                    </tr>
                    <tr>
                      <td height="28" style="height:28px;" class="em_h20">&nbsp;</td>
                    </tr>
                  </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
      </table>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#1C3144">
          <tr>
            <td align="center" valign="top" class="em_aside5"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                <tr>
                  <td align="center" valign="top" style="padding:0 25px; background-color:#ffffff;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                    <tr>
                      <td height="45" style="height:45px;" class="em_h20">&nbsp;</td>
                    </tr>
                    <tr>
                      <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#264780; font-weight:bold;">Msomiflix</td>
                    </tr>
                    <tr>
                      <td height="14" style="height:14px; font-size:0px; line-height:0px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#1C3144;">Hi ${fullName}, Welcome to the Msomiflix platform. To get started, click below to confirm your email. &nbsp;&nbsp;</td>
                    </tr>
                    <tr>
                      <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center" valign="top"><table width="250" style="width:250px; background-color:#6bafb2; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                          <td class="em_white" height="42" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 16px; color:#ffffff; font-weight:bold; height:42px;"><a href="${FRONTEND_DOMAIN}/auth/email-verify?email_verification_token=${token}" target="_blank" style="text-decoration:none; color:#ffffff; line-height:42px; display:block;"> VERIFY EMAIL </a></td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="25" style="height:25px;" class="em_h20">&nbsp;</td>
                    </tr>
                    <tr>
                      <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#1C3144;">If you didn&rsquo;t request any of this, you don&rsquo;t have to do anything.<br class="em_hide" />
      Just ignore this email </td>
                    </tr>
                    <tr>
                      <td height="44" style="height:44px;" class="em_h20">&nbsp;</td>
                    </tr>
                  </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
      </table>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#1C3144">
          <tr>
            <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                <tr>
                  <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                    <tr>
                      <td height="40" style="height:40px;" class="em_h20">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                          </tr>
                        </table>
                       </td>
                    </tr>
                    <tr>
                      <td height="16" style="height:16px; font-size:1px; line-height:1px; height:16px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 18px; color:#ECB84A; font-weight:bold;">Problems or questions?</td>
                    </tr>
                    <tr>
                      <td height="10" style="height:10px; font-size:1px; line-height:1px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" style="font-size:0px; line-height:0px;"><table border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                          <td width="15" align="left" valign="middle" style="font-size:0px; line-height:0px; width:15px;"><a href="mailto:techstuff@tekchurch.com" style="text-decoration:none;"><img src="/assets/pilot/images/templates/email_img.png" width="15" height="12" alt="" border="0" style="display:block; max-width:15px;" /></a></td>
                          <td width="9" style="width:9px; font-size:0px; line-height:0px;" class="em_w5"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                          <td class="em_grey em_font_11" align="left" valign="middle" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 15px; color:#ECB84A;"><a href="mailto:techstuff@tekchurch.com" style="text-decoration:none; color:#ECB84A;">techstuff@tekchurch.com</a> </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                     <tr>
                      <td height="9" style="font-size:0px; line-height:0px; height:9px;" class="em_h10"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                    </tr>
                     <tr>
                      <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                          <td width="12" align="left" valign="middle" style="font-size:0px; line-height:0px; width:12px;"><a href="#" target="_blank" style="text-decoration:none;"><img src="/assets/pilot/images/templates/img_1.png" width="12" height="16" alt="" border="0" style="display:block; max-width:12px;" /></a></td>
                          <td width="7" style="width:7px; font-size:0px; line-height:0px;" class="em_w5">&nbsp;</td>
                          <td class="em_grey em_font_11" align="left" valign="middle" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 15px; color:#ECB84A;"><a href="https://tekchurch.com" target="_blank" style="text-decoration:none; color:#ECB84A;">TekChurch Company </a> &bull; +255 742 246472 &bull; 102 Block F &bull; Dar es salaam, TZ</td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="35" style="height:35px;" class="em_h20">&nbsp;</td>
                    </tr>
                  </table>
                  </td>
                </tr>
                 <tr>
                  <td height="1" bgcolor="#dadada" style="font-size:0px; line-height:0px; height:1px;"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                </tr>
                 <tr>
                  <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                    <tr>
                      <td height="16" style="font-size:0px; line-height:0px; height:16px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="left" class="em_wrapper">
                        <tr>
                          <td class="em_grey" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 11px; line-height: 16px; color:#ECB84A;">&copy; TekChurch 2020  &nbsp;|&nbsp;  <a href="unsubscribe.tekchurch.com" target="_blank" style="text-decoration:underline; color:#ECB84A;">Unsubscribe</a></td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="16" style="font-size:0px; line-height:0px; height:16px;">&nbsp;</td>
                    </tr>
                  </table>
                  </td>
                </tr>
                <tr>
                  <td class="em_hide" style="line-height:1px;min-width:650px;background-color:#1C3144;"><img alt="" src="/assets/pilot/images/templates/spacer.gif" height="1" width="650" style="max-height:1px; min-height:1px; display:block; width:650px; min-width:650px;" border="0" /></td>
                </tr>
              </table>
            </td>
          </tr>
      </table>
      </body>`,
      
  };
  
  mg
  .messages()
  .send(data, function (error, body) {
      
    try {
      if(error){
        logger.error(error);
      } else {
        logger.info({ message: "Email sent successfully" });
      }
    } catch (e) {
      logger.error(e);
    }
      
  });
  
  }//end sendEmailVerification. 