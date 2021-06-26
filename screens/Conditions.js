// imports
import React, { Component } from 'react';
import {
	Modal,
	Text,
	StyleSheet,
	ScrollView,
	TouchableHighlight,
	View
} from 'react-native';
import FormButton from '../components/FormButton';
import AppLogo from '../components/AppLogo';
import colours from './../assets/colours.json';

// START Conditions
class Conditions extends Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.dismissModal = this.dismissModal.bind(this);
	}

	// componentDidMount
	componentDidMount = async () => {
		console.log('Inside componentDidMount from Conditions.js...');
	};

	// show/hide modal visibility
	setModalVisible(visible) {
		this.setState({ modalVisible: visible }, () =>
			console.log('Is modal visible? ' + this.state.modalVisible)
		);
	}

	// dimiss modal
	dismissModal() {
		console.log('Inside dismissModal from Conditions.js...');
		this.setModalVisible(false);
	}

	// START Conditions
	render() {
		console.log('Inside render from Conditions.js...');
		return (
			<View>
				{/* START modal */}
				<Modal animationType='fade' transparent={true} visible={this.state.modalVisible}>
					{/* container */}
					<View style={conditionStyles.modalWrapper}>
						<ScrollView style={{ marginTop: 45, marginBottom: 45 }}>
							{/* logo and heading */}
							<View style={conditionStyles.logoContainer}>
								<AppLogo />
							</View>
							<Text style={conditionStyles.simpleWeather}>SIMPLE WEATHER</Text>
							{/* text wrapper */}
							<View style={conditionStyles.textWrapper}>
								{/* line break */}
								<View style={conditionStyles.border} />
								{/* terms and conditions */}
								<Text style={conditionStyles.helpTextYellow}>AGREEMENT TO TERMS</Text>
								<Text style={conditionStyles.helpTextWhite}>
									These Terms and Conditions constitute a legally binding agreement made
									between you, whether personally or on behalf of an entity (“you”) and
									SIMPLE WEATHER (“we,” “us” or “our”), concerning your access to and use
									of the SIMPLE WEATHER mobile application (collectively, the “App”).
									{'\n\n'}
									You agree that by accessing the App, you have read, understood, and
									agree to be bound by all of these Terms and Conditions. If you do not
									agree with all of these Terms and Conditions, then you are expressly
									prohibited from using the App and you must discontinue use immediately.
									{'\n\n'}
									We reserve the right, in our sole discretion, to make changes or
									modifications to these Terms and Conditions at any time and for any
									reason. We will alert you about any changes by email, and you waive any
									right to receive specific notice of each such change.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										INTELLECTUAL PROPERTY RIGHTS
									</Text>
									{'\n\n'}
									Unless otherwise indicated, the App is our proprietary property and all
									source code, databases, functionality, software, designs, audio, video,
									text, photographs, and graphics on the App (collectively, the “Content”)
									and the trademarks, service marks, and logos contained therein (the
									“Marks”) are owned or controlled by us or licensed to us, and are
									protected by copyright and trademark laws. The Content and the Marks are
									provided on the App “AS IS” for your information and personal use only.
									Except as expressly provided in these Terms and Conditions, no part of
									the App and no Content or Marks may be copied, reproduced, aggregated,
									republished, uploaded, posted, publicly displayed, encoded, translated,
									transmitted, distributed, sold, licensed, or otherwise exploited for any
									commercial purpose whatsoever, without our express prior written
									permission.{'\n\n'}
									Provided that you are eligible to use the App, you are granted a limited
									license to access and use the App and to download or print a copy of any
									portion of the Content to which you have properly gained access solely
									for your personal, non-commercial use. We reserve all rights not
									expressly granted to you in and to the App, the Content and the Marks.
									{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>USER REGISTRATION</Text>
									{'\n\n'}
									You may register with the App. You agree to keep your password
									confidential and will be responsible for all use of your account and
									password. We do not have access to your password though this may be
									reset using the “Forgotten password” link.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										PROHIBITED ACTIVITIES
									</Text>
									{'\n\n'}
									You may not access or use the App for any purpose other than that for
									which we make the App available. The App may not be used in connection
									with any commercial endeavours except those that are specifically
									endorsed or approved by us.{'\n\n'}
									As a user of the App, you agree not to:{'\n\n'}
									(1) systematically retrieve data or other content from the App to create
									or compile, directly or indirectly, a collection, compilation, database,
									or directory without written permission from us.{'\n\n'}
									(2) make any unauthorized use of the App, including collecting usernames
									and/or email addresses of users by electronic or other means for the
									purpose of sending unsolicited email, or creating user accounts by
									automated means or under false pretenses.{'\n\n'}
									(3) use the App to advertise or offer to sell goods and services.
									{'\n\n'}
									(4) circumvent, disable, or otherwise interfere with security-related
									features of the App, including features that prevent or restrict the use
									or copying of any Content or enforce limitations on the use of the App
									and/or the Content contained therein.{'\n\n'}
									(5) engage in unauthorized framing of or linking to the App.{'\n\n'}
									(6) trick, defraud, or mislead us and other users, especially in any
									attempt to learn sensitive account information such as user passwords.
									{'\n\n'}
									(7) make improper use of our support services.{'\n\n'}
									(8) engage in any automated use of the system, such as using scripts to
									send comments or messages, or using any data mining, robots, or similar
									data gathering and extraction tools.{'\n\n'}
									(9) interfere with, disrupt, or create an undue burden on the App or the
									networks or services connected to the App.{'\n\n'}
									(10) attempt to impersonate another user or person or use the username
									of another user.{'\n\n'}
									(11) sell or otherwise transfer your profile.{'\n\n'}
									(12) use any information obtained from the App in order to harass,
									abuse, or harm another person.{'\n\n'}
									(13) use the App as part of any effort to compete with us or otherwise
									use the App and/or the Content for any revenue-generating endeavour or
									commercial enterprise.{'\n\n'}
									(14) decipher, decompile, disassemble, or reverse engineer any of the
									software comprising or in any way making up a part of the App.{'\n\n'}
									(15) attempt to bypass any measures of the App designed to prevent or
									restrict access to the App, or any portion of the App.{'\n\n'}
									(16) harass, annoy, intimidate, or threaten any of our employees or
									agents engaged in providing any portion of the App to you.{'\n\n'}
									(17) delete the copyright or other proprietary rights notice from any
									Content.{'\n\n'}
									(18) copy or adapt the App’s software.{'\n\n'}
									(19) upload or transmit (or attempt to upload or to transmit) viruses,
									Trojan horses, or other material, including excessive use of capital
									letters and spamming (continuous posting of repetitive text), that
									interferes with any party’s uninterrupted use and enjoyment of the App
									or modifies, impairs, disrupts, alters, or interferes with the use,
									features, functions, operation, or maintenance of the App.{'\n\n'}
									(20) upload or transmit (or attempt to upload or to transmit) any
									material that acts as a passive or active information collection or
									transmission mechanism, including without limitation, clear graphics
									interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other
									similar devices (sometimes referred to as “spyware” or “passive
									collection mechanisms” or “pcms”).{'\n\n'}
									(21) except as may be the result of standard search engine or Internet
									browser usage, use, launch, develop, or distribute any automated system,
									including without limitation, any spider, robot, cheat utility, scraper,
									or offline reader that accesses the App, or using or launching any
									unauthorized script or other software.{'\n\n'}
									(22) disparage, tarnish, or otherwise harm, in our opinion, us and/or
									the App.{'\n\n'}
									(23) use the App in a manner inconsistent with any applicable laws or
									regulations.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										MOBILE APPLICATION LICENSE
									</Text>
									{'\n\n'}
									If you access the App via a mobile application, then we grant you a
									revocable, non-exclusive, non-transferable, limited right to install and
									use the mobile application on wireless electronic devices owned or
									controlled by you, and to access and use the mobile application on such
									devices strictly in accordance with the terms and conditions of this
									mobile application license contained in these Terms and Conditions.
									{'\n\n'}
									You shall not:{'\n\n'}
									(1) decompile, reverse engineer, disassemble, attempt to derive the
									source code of, or decrypt the App.{'\n\n'}
									(2) make any modification, adaptation, improvement, enhancement,
									translation, or derivative work from the App.{'\n\n'}
									(3) violate any applicable laws, rules, or regulations in connection
									with your access or use of the App.{'\n\n'}
									(4) remove, alter, or obscure any proprietary notice (including any
									notice of copyright or trademark) posted by us or the licensors of the
									App.{'\n\n'}
									(5) use the application for any revenue generating endeavour, commercial
									enterprise, or other purpose for which it is not designed or intended.
									{'\n\n'}
									(6) make the application available over a network or other environment
									permitting access or use by multiple devices or users at the same time.
									{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										APPLE AND ANDROID DEVICES
									</Text>
									{'\n\n'}
									The following terms apply when you use a mobile application obtained
									from either the Apple Store or Google Play (each an “App Distributor”)
									to access the App:{'\n\n'}
									(1) the license granted to you for our mobile application is limited to
									a non-transferable license to use the application on a device that
									utilizes the Apple iOS or Android operating systems, as applicable, and
									in accordance with the usage rules set forth in the applicable App
									Distributor’s terms and conditions.{'\n\n'}
									(2) we are responsible for providing any maintenance and support
									services with respect to the mobile application as specified in the
									terms and conditions of this mobile application license contained in
									these Terms and Conditions or as otherwise required under applicable
									law, and you acknowledge that each App Distributor has no obligation
									whatsoever to furnish any maintenance and support services with respect
									to the mobile application.{'\n\n'}
									(3) in the event of any failure of the mobile application to conform to
									any applicable warranty, you may notify the applicable App Distributor,
									and the App Distributor, in accordance with its terms and policies, may
									refund the purchase price, if any, paid for the mobile application, and
									to the maximum extent permitted by applicable law, the App Distributor
									will have no other warranty obligation whatsoever with respect to the
									mobile application.{'\n\n'}
									(4) you represent and warrant that (i) you are not located in a country
									that is subject to a U.S. government embargo, or that has been
									designated by the U.S. government as a “terrorist supporting” country
									and (ii) you are not listed on any U.S. government list of prohibited or
									restricted parties.{'\n\n'}
									(5) you must comply with applicable third-party terms of agreement when
									using the mobile application, e.g., if you have a VoIP application, then
									you must not be in violation of their wireless data service agreement
									when using the mobile application.{'\n\n'}
									(6) you acknowledge and agree that the App Distributors are third-party
									beneficiaries of the terms and conditions in this mobile application
									license contained in these Terms and Conditions, and that each App
									Distributor will have the right (and will be deemed to have accepted the
									right) to enforce the terms and conditions in this mobile application
									license contained in these Terms and Conditions against you as a
									third-party beneficiary thereof.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>SUBMISSIONS</Text>
									{'\n\n'}
									You acknowledge and agree that any questions, comments, suggestions,
									ideas, feedback, or other information regarding the App (“Submissions”)
									provided by you to us are non-confidential and shall become our sole
									property. We shall own exclusive rights, including all intellectual
									property rights, and shall be entitled to the unrestricted use and
									dissemination of these Submissions for any lawful purpose, commercial or
									otherwise, without acknowledgment or compensation to you.{'\n\n'}You
									hereby waive all moral rights to any such Submissions, and you hereby
									warrant that any such Submissions are original with you or that you have
									the right to submit such Submissions. You agree there shall be no
									recourse against us for any alleged or actual infringement or
									misappropriation of any proprietary right in your Submissions.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>ADVERTISERS</Text>
									{'\n\n'}
									We allow advertisers to display their advertisements and other
									information in certain areas of the App, such as sidebar advertisements
									or banner advertisements. If you are an advertiser, you shall take full
									responsibility for any advertisements you place on the App and any
									services provided on the App or products sold through those
									advertisements.{'\n\n'}Further, as an advertiser, you warrant and
									represent that you possess all rights and authority to place
									advertisements on the App, including, but not limited to, intellectual
									property rights, publicity rights, and contractual rights. We simply
									provide the space to place such advertisements, and we have no other
									relationship with advertisers.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>APP MANAGEMENT</Text>
									{'\n\n'}
									We reserve the right, but not the obligation, to:{'\n\n'}
									(1) monitor the App for violations of these Terms and Conditions.
									{'\n\n'}
									(2) take appropriate legal action against anyone who, in our sole
									discretion, violates the law or these Terms and Conditions, including
									without limitation, reporting such user to law enforcement authorities.
									{'\n\n'}
									(3) in our sole discretion and without limitation, refuse, restrict
									access to, limit the availability of, or disable (to the extent
									technologically feasible) any of your Contributions or any portion
									thereof.{'\n\n'}
									(4) in our sole discretion and without limitation, notice, or liability,
									to remove from the App or otherwise disable all files and content that
									are excessive in size or are in any way burdensome to our systems.
									{'\n\n'}
									(5) otherwise manage the App in a manner designed to protect our rights
									and property and to facilitate the proper functioning of the App.
									{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>PRIVACY POLICY</Text>
									{'\n\n'}
									We care about data privacy and security. Please review our Privacy
									Policy. By using the App, you agree to be bound by our Privacy Policy,
									which is incorporated into these Terms and Conditions. Please be advised
									the App is hosted in the United States. If you access the App from the
									European Union, Asia, or any other region of the world with laws or
									other requirements governing personal data collection, use, or
									disclosure that differ from applicable laws in the United States, then
									through your continued use of the App, you are transferring your data to
									the United States, and you expressly consent to have your data
									transferred to and processed in the United States.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										COPYRIGHT INFRINGEMENTS
									</Text>
									{'\n\n'}
									We respect the intellectual property rights of others. If you believe
									that any material available on or through the App infringes upon any
									copyright you own or control, please immediately notify us using the
									contact information provided below (a “Notification”). A copy of your
									Notification will be sent to the person who posted or stored the
									material addressed in the Notification. Please be advised that pursuant
									to federal law you may be held liable for damages if you make material
									misrepresentations in a Notification. Thus, if you are not sure that
									material located on or linked to by the App infringes your copyright,
									you should consider first contacting an attorney.]{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>TERM AND TERMINATION</Text>
									{'\n\n'}
									These Terms and Conditions shall remain in full force and effect while
									you use the App.{'\n\n'}WITHOUT LIMITING ANY OTHER PROVISION OF THESE
									TERMS AND CONDITIONS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION
									AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE APP
									(INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON
									OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
									REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS AND
									CONDITIONS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
									USE OR PARTICIPATION IN THE APP OR DELETE [YOUR ACCOUNT AND] ANY CONTENT
									OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE
									DISCRETION.{'\n\n'}
									If we terminate or suspend your account for any reason, you are
									prohibited from registering and creating a new account under your name,
									a fake or borrowed name, or the name of any third party, even if you may
									be acting on behalf of the third party. In addition to terminating or
									suspending your account, we reserve the right to take appropriate legal
									action, including without limitation pursuing civil, criminal, and
									injunctive redress.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										MODIFICATIONS AND INTERRUPTIONS
									</Text>
									{'\n\n'}
									We reserve the right to change, modify, or remove the contents of the
									App at any time or for any reason at our sole discretion without notice.
									However, we have no obligation to update any information on our Site. We
									also reserve the right to modify or discontinue all or part of the App
									without notice at any time.{'\n\n'}
									We will not be liable to you or any third party for any modification,
									price change, suspension, or discontinuance of the App. We cannot
									guarantee the App will be available at all times. We may experience
									hardware, software, or other problems or need to perform maintenance
									related to the App, resulting in interruptions, delays, or errors.
									{'\n\n'}
									We reserve the right to change, revise, update, suspend, discontinue, or
									otherwise modify the App at any time or for any reason without notice to
									you. You agree that we have no liability whatsoever for any loss,
									damage, or inconvenience caused by your inability to access or use the
									App during any downtime or discontinuance of the App.{'\n\n'}
									Nothing in these Terms and Conditions will be construed to obligate us
									to maintain and support the App or to supply any corrections, updates,
									or releases in connection therewith.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>CORRECTIONS</Text>
									{'\n\n'}
									There may be information on the App that contains typographical errors,
									inaccuracies, or omissions that may relate to the App, including
									descriptions, pricing, availability, and various other information. We
									reserve the right to correct any errors, inaccuracies, or omissions and
									to change or update the information on the App at any time, without
									prior notice.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>DISCLAIMER</Text>
									{'\n\n'}
									THE APP IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT
									YOUR USE OF THE APP AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE
									FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR
									IMPLIED, IN CONNECTION WITH THE APP AND YOUR USE THEREOF, INCLUDING,
									WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
									FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR
									REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE APP’S CONTENT
									OR THE CONTENT OF ANY WEBSITES LINKED TO THE APP AND WE WILL ASSUME NO
									LIABILITY OR RESPONSIBILITY FOR ANY{'\n\n'}(1) ERRORS, MISTAKES, OR
									INACCURACIES OF CONTENT AND MATERIALS.{'\n\n'}(2) PERSONAL INJURY OR
									PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO
									AND USE OF THE APP.{'\n\n'}(3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
									SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL
									INFORMATION STORED THEREIN.{'\n\n'}(4) ANY INTERRUPTION OR CESSATION OF
									TRANSMISSION TO OR FROM THE APP.{'\n\n'}(5) ANY BUGS, VIRUSES, TROJAN
									HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE APP BY
									ANY THIRD PARTY.{'\n\n'}(6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND
									MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF
									THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE
									VIA THE APP. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
									RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A
									THIRD PARTY THROUGH THE APP, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR
									MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE
									WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
									TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
									SERVICES.{'\n\n'}
									AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN
									ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION
									WHERE APPROPRIATE.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										LIMITATIONS OF LIABILITY
									</Text>
									{'\n\n'}
									IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO
									YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
									EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
									PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR
									USE OF THE APP, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
									DAMAGES.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>USER DATA</Text>
									{'\n\n'}
									We will maintain certain data that you transmit to the App for the
									purpose of managing the App, as well as data relating to your use of the
									App. Although we perform regular routine backups of data, you are solely
									responsible for all data that you transmit or that relates to any
									activity you have undertaken using the App.{'\n\n'}
									You agree that we shall have no liability to you for any loss or
									corruption of any such data, and you hereby waive any right of action
									against us arising from any such loss or corruption of such data.
									{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>
										ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
									</Text>
									{'\n\n'}
									Visiting the App, sending us emails, and completing online forms
									constitute electronic communications. You consent to receive electronic
									communications, and you agree that all agreements, notices, disclosures,
									and other communications we provide to you electronically, via email and
									on the App, satisfy any legal requirement that such communication be in
									writing.{'\n\n'}
									YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS,
									AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
									RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE APP.
									{'\n\n'}
									You hereby waive any rights or requirements under any statutes,
									regulations, rules, ordinances, or other laws in any jurisdiction which
									require an original signature or delivery or retention of non-electronic
									records, or to payments or the granting of credits by any means other
									than electronic means.{'\n\n'}
									<Text style={conditionStyles.helpTextYellow}>MISCELLANEOUS</Text>
									{'\n\n'}
									These Terms and Conditions and any policies or operating rules posted by
									us on the App constitute the entire agreement and understanding between
									you and us. Our failure to exercise or enforce any right or provision of
									these Terms and Conditions shall not operate as a waiver of such right
									or provision.{'\n\n'}
									These Terms and Conditions operate to the fullest extent permissible by
									law. We may assign any or all of our rights and obligations to others at
									any time. We shall not be responsible or liable for any loss, damage,
									delay, or failure to act caused by any cause beyond our reasonable
									control.{'\n\n'}
									If any provision or part of a provision of these Terms and Conditions is
									determined to be unlawful, void, or unenforceable, that provision or
									part of the provision is deemed severable from these Terms and
									Conditions and does not affect the validity and enforceability of any
									remaining provisions.{'\n\n'}
									There is no joint venture, partnership, employment or agency
									relationship created between you and us as a result of these Terms and
									Conditions or use of the App. You agree that these Terms and Conditions
									will not be construed against us by virtue of having drafted them.
									{'\n\n'}
									You hereby waive any and all defenses you may have based on the
									electronic form of these Terms and Conditions and the lack of signing by
									the parties hereto to execute these Terms and Conditions.
								</Text>
								{/* line break */}
								<View style={conditionStyles.border} />
							</View>
							{/* confirm button */}
							<View style={conditionStyles.buttonContainer}>
								<FormButton
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
									}}
									title='BACK'
								/>
							</View>
						</ScrollView>
					</View>
				</Modal>
				{/* END modal */}
				{/* show modal button */}
				<TouchableHighlight
					onPress={() => {
						this.setModalVisible(true);
					}}>
					<Text
						style={{
							color: colours.spotRed,
							textAlign: 'center',
							fontFamily: 'allerLt',
							fontSize: 16
						}}>
						Read terms and conditions
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
	// END render Conditions
}
// END render Conditions

export default Conditions;

// style
const conditionStyles = StyleSheet.create({
	modalWrapper: {
		alignItems: 'center',
		backgroundColor: colours.spotGreyMed,
		flex: 1,
		justifyContent: 'center'
	},
	textWrapper: {
		marginLeft: 25,
		marginRight: 25
	},
	border: {
		marginTop: 10,
		marginBottom: 10,
		borderBottomColor: colours.spotGrey,
		borderBottomWidth: 1
	},
	helpTextWhite: {
		color: colours.white,
		fontSize: 16,
		lineHeight: 24,
		fontFamily: 'allerLt',
		textAlign: 'left',
		padding: 8
	},
	helpTextYellow: {
		color: colours.spotYellow,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'left',
		padding: 8
	},
	buttonContainer: {
		alignSelf: 'stretch',
		marginLeft: 25,
		marginRight: 25,
		marginBottom: 10,
		marginTop: 20
	},
	logoContainer: {
		marginBottom: 10,
		alignItems: 'center'
	},
	simpleWeather: {
		color: colours.white,
		fontSize: 20,
		fontFamily: 'allerDisplay',
		textAlign: 'center',
		paddingTop: 4,
		marginBottom: 10
	}
});
