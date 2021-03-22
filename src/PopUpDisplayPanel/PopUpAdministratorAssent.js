import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';
import Label from '../Atoms/Labels/Label';

const PopUpAdministratorAssent = (props) => {
  const { isActive, headerPanelColour, headerOne, headerOneBadgeOne, onClick, onClose } = props;

  return (
    <div>
      <Popup isActive={isActive}>
        <PopUpWhiteHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          mode={'core'}
          onClick={onClick}
          onClose={onClose}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div
            style={{
              maxWidth: '297px',
              textAlign: 'left',
              padding: '5px',
              boxSizing: 'border-box'
            }}
            id="dialog-description"
          >
            <Label
              text="Terms of Use"
              fontSize="1.6rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10 font-weight-bold"
            />
            <br />
            <Label
              text="THIS IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU REPRESENT (hereinafter “You” or “Your”) AND iGURU VENTURES PRIVATE LIMITED (hereinafter “iGURU”). Your use of this website (“Site”) or any of the products and services offered on this Site (collectively, the “Services”) is conditioned on your acceptance without modification of these Terms of use (“Terms”)."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="iGURU may update and change the Terms of use from time to time without notice. Continued use of the Services after any such changes shall constitute your consent to such changes. You are responsible for regularly reviewing the most current version of the Terms of use which are currently available at http://insightGURU.com.

              These terms of use also include iGURU’S Privacy Policy which is available for review at http://insightGURU.com"
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="Acceptance of the Terms"
              fontSize="1.6rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10 font-weight-bold"
            />
            <br />
            <Label
              text="This Agreement consists of the following terms and conditions (hereinafter the “Terms” or “Terms of use”). You must be of legal age (18 years or above) to enter into a binding agreement in order to accept the Terms. If you do not agree to the Terms, do not use any of our Services. By putting a check mark next to I AGREE and clicking on SUBMIT or using the API or Services, you represent that you have read and agree to the terms and conditions of this Agreement. Violation of any part of the Terms of use may result in termination of your account.

              You must provide your Full Name, Email address, phone number and any other information that is required to complete the sign up process."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="You are responsible for maintaining the security of your account login information and for any activities or actions occurring under your account. iGURU recommends you to use a “strong password” (passwords that use a combination of lower and upper case alphabets, numbers, spaces and special characters) and that iGURU will not be held responsible for any loss or damages resulting from your failure to comply with this obligation."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="A single username/password combination will be used only by one person. A single username/password combination shared by multiple people is not permitted."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="You agree to use iGURU services for lawful purposes only. You shall not post using IGURU services any material which violates or infringes in any way upon the rights of others, which is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offense, give right to civil liability or otherwise violate any applicable law."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="One person/entity cannot use or create or maintain more than one account on the website.
              iGURU reserves the right to refuse the service to anyone for any reason at any time with due cause or if there is a conflict with the terms of use of the Services."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="You may not use the Services in a way that is detrimental to the operation of the Services or the access or use of the Services by anyone else."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="You will not transmit, promote using iGURU services any material which violates or infringes in any way upon the rights of others, which is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offense, give right to civil liability or otherwise violate any applicable law."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="Pricing and Payments"
              fontSize="1.6rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10 font-weight-bold"
            />
            <br />
            <Label
              text="iGURU reserves the right to establish and charge fees for the Services and to change its fees and charges at any time for any reason."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="IGURU is not liable to you or to any third party for any change to the Services, price change, suspension, locking of your account or discontinuance of the Services if you or a third party default on their payment obligations."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="Cancellation and Termination"
              fontSize="1.6rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10 font-weight-bold"
            />
            <br />
            <Label
              text="If you choose to cancel/close your account, you are solely responsible for doing so properly. Cancellation requests must be made at least seven business days prior to the end of the current service period."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="Once your cancellation takes effect, iGURU will delete all the content from your account reasonably promptly after the cancellation. Data from canceled accounts cannot be recovered later."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="iGURU does not accept any responsibility for loss of Content due to account cancellation."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="iGURU in its sole discretion has the right to suspend, terminate or restrict your access to the Services, or any other iGURU service, for any reason and at any time. Such termination of the Services will result in the deactivation or deletion of your account or your access to your account, and the deletion of all the content on your account. iGURU also reserves the right to refuse to provide the Services to anyone for any reason at any time.
              Ownership and Licenses.,/p>"
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="IGURU and our licensors retain all of its right, title and interest in and to all patent rights, inventions, copyrights, know-how and trade secrets relating to the site, service and any emails that might be sent out. The iGURU logo and name are trademarks of IGURU Ventures Private Limited and may be registered in certain jurisdictions. All other product names, company names, marks, logos and symbols on http://insightGURU.com may be the trademarks of their respective owners.

              IGURU does not claim any intellectual property rights over any Content made available to others through your account or service. Additionally, your profile and other Content you provide to iGURU in connection with the Services remain yours.
              
              You agree to allow iGURU to use your brand name/logo in the customers section on the iGURU website."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="User Content: Third party content and data"
              fontSize="1.6rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10 font-weight-bold"
            />
            <br />
            <Label
              text="If you are posting content using any of our associated URLs (http://insightGURU.com), you agree to be following the terms and conditions specified by the Third party provider you are linking to."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="Disclaimer and Limitation of Liability"
              fontSize="1.6rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10 font-weight-bold"
            />
            <br />
            <Label
              text="THE SERVICES ARE PROVIDED “AS IS”, “AS AVAILABLE”, WITH ALL FAULTS AND WITHOUT WARRANTIES, REPRESENTATIONS OR CONDITIONS OF ANY KIND.
              USE OF THE SERVICES IS ENTIRELY AT YOUR OWN RISK. I]iGURU DOES NOT MAKE ANY REPRESENTATIONS, WARRANTIES OR CONDITIONS ABOUT THE QUALITY, ACCURACY, SECURITY, RELIABILITY, COMPLETENESS, QUIET ENJOYMENT, CURRENCY, OR TIMELINESS OF THE SERVICES. IGURU DOES NOT ASSUME ANY
              RESPONSIBILITY FOR ANY INCOMPLETENESS, ERRORS, SECURITY, VIRUSES, BUGS, PROBLEMS, OMISSIONS, INACCURACIES OR OTHER LIMITATIONS IN, ORINTERRUPTIONS IN THE OPERATION OF THE SERVICES.
              
              Specifically disclaims any implied warranties of merchantability, fitness for a particular purpose, non-infringement, information accuracy, integration or interoperability.
              
              You understand and agree that you use the site and services at your own discretion and risk and that you will be solely responsible for any damages that arise from such use."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label
              text="Grievance Resolution Process"
              fontSize="1.6rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10 font-weight-bold"
            />
            <br />
            <Label
              text="In case of any grievances, you are free to contact us at our registered office, by phone, by email or through our website."
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
              className="margin-bottom-10"
            />
            <br />
            <Label text="Address" fontSize="1.2rem" colour="rgba(0, 0, 0, 0.87)" />
            <br />
            <Label text="IGURU Ventures Pvt Ltd." fontSize="1.2rem" colour="rgba(0, 0, 0, 0.87)" />
            <br />
            <Label text="602, Silver Beliza," fontSize="1.2rem" colour="rgba(0, 0, 0, 0.87)" />
            <br />
            <Label
              text="48 St. Fancis Avenue, Santacruz,"
              fontSize="1.2rem"
              colour="rgba(0, 0, 0, 0.87)"
            />
            <br />
            <Label text="Mumbai 400054 | India" fontSize="1.2rem" colour="rgba(0, 0, 0, 0.87)" />
            <br />
            <Label text="P: +91.9821056706" fontSize="1.2rem" colour="rgba(0, 0, 0, 0.87)" />
            <br />
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAdministratorAssent;
