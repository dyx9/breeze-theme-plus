import * as React from 'react'
import Layout from '../components/layout/layout'
import Sidebar from '../components/sidebar/sidebar'
import Main from '../components/layout/main'
import * as styles from './contact.module.scss';


const ContactPage = () => {
  return(
    <Layout pageTitle="Contact Me">
      <Sidebar />
      <Main>
        <div className={styles.contactContainer}>
          <p id={styles.lineOne}>Let's Talk</p>
          <p className={styles.contentDesktop}>You can send me a message using the form below, or use the social media links in the sidebar.</p>
          <p className={styles.contentMobile}>You can send me a message using the form below, or use the social media links in the drop-down menu.</p>
          <div className={styles.formContainer}>

            <form name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />

              <div className={styles.inputArea}>
                <input id="name" type="text" name="name" required/>
                <label htmlFor="name" >Your name</label>
              </div>
              <div className={styles.inputArea}>
                <input id="contact" type="text" name="contact" required/>
                <label htmlFor="contact">How can I get back to you</label>
              </div>
              <div className={styles.inputArea}>
                <textarea id="message" type="message" name="message" required/>
                <label htmlFor="message">Your message</label>
              </div>
              <button type="submit">Send</button>

            </form>


          </div>

        </div>
      </Main>
    </Layout>
  )
}

export default ContactPage