import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import programData from "../Literals/Literals";

const { program } = programData;

const styles = theme => ({
  root: {
    margin: "100px 24px",
    padding: theme.spacing.unit * 6
  },
  marginBottom: {
    marginBottom: theme.spacing.unit * 2
  }
});

function TermsAndConditions(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        TERMS OF SERVICE
      </Typography>

      <Typography variant="h6" gutterBottom>
        OVERVIEW
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        This website is operated by {program.name}. Throughout the site, the
        terms “we”, “us” and “our” refer to {program.name}. We offer this
        website, including all information and services available from this site
        to you, the user, conditioned upon your acceptance of all terms,
        conditions, policies and notices stated here.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        By visiting our site you engage in our “Service” and agree to be bound
        by the following terms and conditions (“Terms of Service”, “Terms”),
        including those additional terms and conditions and policies referenced
        herein and/or available by hyperlink. These Terms of Service apply to
        all users of the site, including without limitation users who are
        browsers, vendors, customers, merchants, and/ or contributors of
        content.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Please read these Terms of Service carefully before accessing or using
        our website. By accessing or using any part of the site, you agree to be
        bound by these Terms of Service. If you do not agree to all the terms
        and conditions of this agreement, then you may not access the website or
        use any services. If these Terms of Service are considered an offer,
        acceptance is expressly limited to these Terms of Service.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Any new features or tools which are added to the current store shall
        also be subject to the Terms of Service. You can review the most current
        version of the Terms of Service at any time on this page. We reserve the
        right to update, change or replace any part of these Terms of Service by
        posting updates and/or changes to our website. It is your responsibility
        to check this page periodically for changes. Your continued use of or
        access to the website following the posting of any changes constitutes
        acceptance of those changes.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 1 - ONLINE STORE TERMS
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        By agreeing to these Terms of Service, you represent that you are at
        least the age of majority in your state or province of residence, or
        that you are the age of majority in your state or province of residence
        and you have given us your consent to allow any of your minor dependents
        to use this site.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You may not use our services for any illegal or unauthorized purpose nor
        may you, in the use of the Service, violate any laws in your
        jurisdiction (including but not limited to copyright laws).
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You must not transmit any worms or viruses or any code of a destructive
        nature.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        A breach or violation of any of the Terms will result in an immediate
        termination of your Services.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 2 - GENERAL CONDITIONS
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We provide the information of the mentors that are participating in our
        program but you must contact them in order to receive advice from them.
        All communication between you and the mentors must be professional.
      </Typography>
      <Typography variant="body1" className={classes.marginBottom}>
        We do not tolerate harassment of participants in any form. Sexual
        language and imagery is never appropriate. We may refuse service to
        anyone for violating these rules.
      </Typography>
      <Typography variant="body1" className={classes.marginBottom}>
        We reserve the right to refuse service to anyone for any reason at any
        time.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You understand that your content, may be transferred unencrypted and
        involve (a) transmissions over various networks; and (b) changes to
        conform and adapt to technical requirements of connecting networks or
        devices.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You agree not to reproduce, duplicate, copy, sell, resell or exploit any
        portion of the Service, use of the Service, or access to the Service or
        any contact on the website through which the service is provided,
        without express written permission by us.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        The headings used in this agreement are included for convenience only
        and will not limit or otherwise affect these Terms.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We are not responsible if information made available on this site is not
        accurate, complete or current. The material on this site is provided for
        general information only and should not be relied upon or used as the
        sole basis for making decisions without consulting primary, more
        accurate, more complete or more timely sources of information. Any
        reliance on the material on this site is at your own risk.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        This site may contain certain historical information. Historical
        information, necessarily, is not current and is provided for your
        reference only. We reserve the right to modify the contents of this site
        at any time, but we have no obligation to update any information on our
        site. You agree that it is your responsibility to monitor changes to our
        site.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 4 - MODIFICATIONS TO THE SERVICE
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We reserve the right at any time to modify or discontinue the Service
        (or any part or content thereof) without notice at any time.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We shall not be liable to you or to any third-party for any
        modification, suspension or discontinuance of the Service.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 5 - SERVICES
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We have made every effort to display as accurately as possible the
        colors and images of our products that appear at the store. We cannot
        guarantee that your computer monitor's display of any color will be
        accurate.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 6 - OPTIONAL TOOLS
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We may provide you with access to third-party tools over which we
        neither monitor nor have any control nor input.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 7 - THIRD-PARTY LINKS
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Certain content, products and services available via our Service may
        include materials from third-parties.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Third-party links on this site may direct you to third-party websites
        that are not affiliated with us. We are not responsible for examining or
        evaluating the content or accuracy and we do not warrant and will not
        have any liability or responsibility for any third-party materials or
        websites, or for any other materials, products, or services of
        third-parties.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 8 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        If, at our request, you send certain specific submissions (for example
        contest entries) or without a request from us you send creative ideas,
        suggestions, proposals, plans, or other materials, whether online, by
        email, by postal mail, or otherwise (collectively, 'comments'), you
        agree that we may, at any time, without restriction, edit, copy,
        publish, distribute, translate and otherwise use in any medium any
        comments that you forward to us. We are and shall be under no obligation
        (1) to maintain any comments in confidence; (2) to pay compensation for
        any comments; or (3) to respond to any comments.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We may, but have no obligation to, monitor, edit or remove content that
        we determine in our sole discretion are unlawful, offensive,
        threatening, libelous, defamatory, pornographic, obscene or otherwise
        objectionable or violates any party’s intellectual property or these
        Terms of Service.
      </Typography>
      <Typography variant="body1" className={classes.marginBottom}>
        You agree that your comments will not violate any right of any
        third-party, including copyright, trademark, privacy, personality or
        other personal or proprietary right. You further agree that your
        comments will not contain libelous or otherwise unlawful, abusive or
        obscene material, or contain any computer virus or other malware that
        could in any way affect the operation of the Service or any related
        website. You may not use a false e-mail address, pretend to be someone
        other than yourself, or otherwise mislead us or third-parties as to the
        origin of any comments. You are solely responsible for any comments you
        make and their accuracy. We take no responsibility and assume no
        liability for any comments posted by you or any third-party.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 9 - PERSONAL INFORMATION
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Your submission of personal information through the store is governed by
        our Privacy Policy. To view our Privacy Policy.
      </Typography>

      <Typography variant="h6" className={classes.marginBottom}>
        SECTION 10 - ERRORS, INACCURACIES AND OMISSIONS
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Occasionally there may be information on our site or in the Service that
        contains typographical errors, inaccuracies or omissions that may relate
        to product descriptions, pricing, promotions, offers, product shipping
        charges, transit times and availability. We reserve the right to correct
        any errors, inaccuracies or omissions, and to change or update
        information or cancel orders if any information in the Service or on any
        related website is inaccurate at any time without prior notice
        (including after you have submitted your order).
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We undertake no obligation to update, amend or clarify information in
        the Service or on any related website, including without limitation,
        pricing information, except as required by law. No specified update or
        refresh date applied in the Service or on any related website, should be
        taken to indicate that all information in the Service or on any related
        website has been modified or updated.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 11 - PROHIBITED USES
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        In addition to other prohibitions as set forth in the Terms of Service,
        you are prohibited from using the site or its content: (a) for any
        unlawful purpose; (b) to solicit others to perform or participate in any
        unlawful acts; (c) to violate any international, federal, provincial or
        state regulations, rules, laws, or local ordinances; (d) to infringe
        upon or violate our intellectual property rights or the intellectual
        property rights of others; (e) to harass, abuse, insult, harm, defame,
        slander, disparage, intimidate, or discriminate based on gender, sexual
        orientation, religion, ethnicity, race, age, national origin, or
        disability; (f) to submit false or misleading information; (g) to upload
        or transmit viruses or any other type of malicious code that will or may
        be used in any way that will affect the functionality or operation of
        the Service or of any related website, other websites, or the Internet;
        (h) to collect or track the personal information of others; (i) to spam,
        phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or
        immoral purpose; or (k) to interfere with or circumvent the security
        features of the Service or any related website, other websites, or the
        Internet. We reserve the right to terminate your use of the Service or
        any related website for violating any of the prohibited uses.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 12 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We do not guarantee, represent or warrant that your use of our service
        will be uninterrupted, timely, secure or error-free.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We do not warrant that the results that may be obtained from the use of
        the service will be accurate or reliable.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You agree that from time to time we may remove the service for
        indefinite periods of time or cancel the service at any time, without
        notice to you.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You expressly agree that your use of, or inability to use, the service
        is at your sole risk. The service and all products and services
        delivered to you through the service are (except as expressly stated by
        us) provided 'as is' and 'as available' for your use, without any
        representation, warranties or conditions of any kind, either express or
        implied, including all implied warranties or conditions of
        merchantability, merchantable quality, fitness for a particular purpose,
        durability, title, and non-infringement.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 13 - INDEMNIFICATION
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You agree to indemnify, defend and hold harmless {program.name} and our
        parent, subsidiaries, affiliates, partners, officers, directors, agents,
        contractors, licensors, service providers, subcontractors, suppliers,
        interns and employees, harmless from any claim or demand, including
        reasonable attorneys’ fees, made by any third-party due to or arising
        out of your breach of these Terms of Service or the documents they
        incorporate by reference, or your violation of any law or the rights of
        a third-party.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 14 - SEVERABILITY
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        In the event that any provision of these Terms of Service is determined
        to be unlawful, void or unenforceable, such provision shall nonetheless
        be enforceable to the fullest extent permitted by applicable law, and
        the unenforceable portion shall be deemed to be severed from these Terms
        of Service, such determination shall not affect the validity and
        enforceability of any other remaining provisions.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 15 - TERMINATION
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        The obligations and liabilities of the parties incurred prior to the
        termination date shall survive the termination of this agreement for all
        purposes.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        These Terms of Service are effective unless and until terminated by
        either you or us. You may terminate these Terms of Service at any time
        by notifying us that you no longer wish to use our Services, or when you
        cease using our site.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        If in our sole judgment you fail, or we suspect that you have failed, to
        comply with any term or provision of these Terms of Service, we also may
        terminate this agreement at any time without notice and you will remain
        liable for all amounts due up to and including the date of termination;
        and/or accordingly may deny you access to our Services (or any part
        thereof).
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 16 - ENTIRE AGREEMENT
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        The failure of us to exercise or enforce any right or provision of these
        Terms of Service shall not constitute a waiver of such right or
        provision.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        These Terms of Service and any policies or operating rules posted by us
        on this site or in respect to The Service constitutes the entire
        agreement and understanding between you and us and govern your use of
        the Service, superseding any prior or contemporaneous agreements,
        communications and proposals, whether oral or written, between you and
        us (including, but not limited to, any prior versions of the Terms of
        Service).
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Any ambiguities in the interpretation of these Terms of Service shall
        not be construed against the drafting party.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 17 - GOVERNING LAW
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        These Terms of Service and any separate agreements whereby we provide
        you Services shall be governed by and construed in accordance with the
        laws of Washington, DC, 20002, United States.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 18 - CHANGES TO TERMS OF SERVICE
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        You can review the most current version of the Terms of Service at any
        time at this page.
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        We reserve the right, at our sole discretion, to update, change or
        replace any part of these Terms of Service by posting updates and
        changes to our website. It is your responsibility to check our website
        periodically for changes. Your continued use of or access to our website
        or the Service following the posting of any changes to these Terms of
        Service constitutes acceptance of those changes.
      </Typography>

      <Typography variant="h6" gutterBottom>
        SECTION 19 - CONTACT INFORMATION
      </Typography>

      <Typography variant="body1" className={classes.marginBottom}>
        Questions about the Terms of Service should be sent to us at
        perlai.jarillo@gmail.com.
      </Typography>
    </div>
  );
}

TermsAndConditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TermsAndConditions);
