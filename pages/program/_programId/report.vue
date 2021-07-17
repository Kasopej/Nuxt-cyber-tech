<template>
  <main>
    <v-breadcrumbs
      large
      divider="»"
      :items="breadcrumbsItems"
      class="pa-0 py-4"
    />

    <article class="pb-8">
      <program-item-list-card :program="program" show-visibility />
    </article>

    <v-form ref="form1" v-model="validate">
      <v-row>
        <v-col cols="12" md="8">
          <v-row class="d-none">
            <v-col>
              <v-switch
                v-model="FORM.visibility"
                :label="
                  FORM.visibility
                    ? 'Make Report Private '
                    : 'Make Report Public'
                "
              ></v-switch>
            </v-col>
            <v-col>
              <v-switch
                v-model="FORM.notification"
                :label="
                  FORM.notification
                    ? 'Disable Notification'
                    : 'Enable Notification'
                "
              ></v-switch>
            </v-col>
          </v-row>

          <section>
            <header class="py-4">
              <div class="headline pb-4">Bug Scope</div>
              <div class="grey--text text--darken-2">
                This describes the severity level of the Vulnerability
              </div>
            </header>
            <v-autocomplete
              v-model="FORM.scope"
              label="Traget Scope"
              item-value="value"
              item-text="label"
              :items="scopes"
              outlined
            >
            </v-autocomplete>
          </section>

          <section>
            <header class="py-4">
              <div class="headline pb-4">Technical Severity</div>
              <div class="grey--text text--darken-2">
                This describes the Technical Severity of the Vulnerability
              </div>
            </header>

            <v-autocomplete
              v-model="FORM.technicalSeverity"
              outlined
              label="Technical Severity"
              :items="technicalSeverity"
              :rules="[...rules.required]"
            >
            </v-autocomplete>
          </section>

          <section>
            <header class="py-4">
              <div class="headline pb-4">Vulnerability Type</div>
              <div class="grey--text text--darken-2">
                This describes the Technical Severity of the Vulnerability
              </div>
            </header>

            <v-autocomplete
              v-model="FORM.bugtype"
              outlined
              label="Vulnerability Type"
              :items="vulnerabilityType"
              :rules="[...rules.required]"
            >
            </v-autocomplete>
          </section>

          <section>
            <header class="py-4">
              <div class="headline pb-4">Bug Summary</div>
              <div class="grey--text text--darken-2">
                A clear and concise summary title includes the type of
                vulnerability and the impacted asset. 200 Words
              </div>
            </header>

            <v-text-field
              v-model="FORM.title"
              block
              outlined
              label="Summary Title"
              :rules="[...rules.required]"
            />
          </section>

          <section>
            <header class="py-4">
              <div class="headline pb-4">CVE Identifier</div>
              <div class="grey--text text--darken-2">
                An example CVE ID would be "CVE-2018-1234" and "CVE-2006-4529".
                The syntax for a CVE ID is CVE-YYYY-NNNN
              </div>
            </header>
            <v-text-field
              v-model="FORM.cveid"
              block
              outlined
              label="CVE Id"
              :rules="[...rules.required]"
            />
          </section>

          <section>
            <header class="py-4">
              <div class="headline pb-4">Bug Description</div>
              <div class="grey--text text--darken-2">
                What is the vulnerability? In clear steps, how do you reproduce
                it? Please replace all the [square] sections below with the
                pertinent details. Remember, the more detail you provide, the
                easier it is for us to triage and respond quickly, so be sure to
                take your time filling out the report!
              </div>
            </header>

            <section class="elevation-2 pa-4 rounded">
              <div class="text-right">
                <v-btn
                  small
                  :outlined="!!descriptionPreview"
                  color="accent"
                  @click="clearPreview()"
                  >Write
                  <v-icon small class="ml-2"
                    >mdi-fountain-pen-tip</v-icon
                  ></v-btn
                >
                <v-btn
                  small
                  :outlined="!descriptionPreview"
                  color="accent"
                  class="my-2 mx-md-3"
                  @click="previewdescription()"
                  >Preview <v-icon small class="ml-2">mdi-eye</v-icon></v-btn
                >
              </div>

              <div
                v-if="descriptionPreview"
                class="elevation-2 rounded px-2 py-4"
                v-html="descriptionPreview"
              />
              <v-textarea
                v-else
                v-model="FORM.description"
                else
                outlined
                hide-details
              />

              <div class="pt-2">
                <small class="grey--text darken-2"
                  >Styling with MarkDown is supported</small
                >
              </div>
            </section>
          </section>

          <section>
            <header class="py-4">
              <div class="headline py-4">Attachments</div>
              <div class="grey--text text--darken-2">
                You can attach multiple files (up to 20). Please keep individual
                upload size under 400MB.
              </div>
            </header>

            <v-file-input
              v-model="FORM.attachments"
              chips
              block
              outlined
              multiple
              @change="handleAttachment"
              ref="attachments"
              label="Attachments"
            />
          </section>
        </v-col>

        <submission-severity-settings hide-actions />
      </v-row>

      <section class="py-2">
        <v-checkbox v-model="FORM.acceptTerms" :rules="[...rules.required]">
          <template #label>
            I have followed the <strong class="px-2">program brief</strong> and
            agree to Teklabspace's
            <a href="https://www.teklabspace.com/terms-condition" class="px-2"
              >Terms &amp; Conditions</a
            >
          </template>
        </v-checkbox>
      </section>

      <v-row class="py-6">
        <v-col>
          <v-btn text large color="accent" @click="$router.go(-1)"
            >Cancel</v-btn
          > </v-col
        ><v-col>
          <v-btn block large color="primary" @click="submitReport()"
            >Submit Report</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card class="subtitle-1 text-center pa-8">
        <v-icon x-large color="primary">mdi-checkbox-marked-circle</v-icon>
        <div class="headline py-8">Report created successfully</div>
        <v-btn color="primary" to="/submission/"> Continue </v-btn>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import showdown from 'showdown'

export default {
  layout: 'dashboard',
  middleware: 'auth',

  data() {
    return {
      dialog: false,
      validate: true,
      descriptionPreview: null,
      fileArray: [],

      program: this.$store.state.program.data,
      scopes: [] || null,

      FORM: {
        visibility: true,
        notification: true,
        // reference: Math.random().toString(36).slice(2),
        description:
          '## Summary:\n[add summary of the vulnerability]\n\n## Steps To Reproduce:\n[add details for how we can reproduce the issue]\n\n  1. [add step]\n  2. [add step]\n  3. [add step]\n\n## Supporting Material/References:\n\n[list any additional material (e.g. screenshots, logs, etc.)]\n\n## Remediation:\n\n[add details for possible remidiation]\n\n  * [attachment / reference]',
      },

      technicalSeverity: ['Low', 'Medium', 'Critical', 'High'],
      vulnerabilityType: [
        'Cross-site Scripting (XSS): Reflected, Persistent and DOM-based XSS:',
        'SQL Injection (SQLi)',
        'Cross-site Request Forgery (CSRF)',
        'Server Side Request Forgery (SSRF)',
        'Remote File Inclusion (RFI)',
        'Local File Inclusion (LFI)',
        'Remote Code Execution (RCE)',
        'CRLF Injection',
        'LDAP Injection',
        'Failure to restrict URL Access',
        'Insufficient Transport Layer Protection',
        'Unvalidated Redirects and Forwards',
        'Insecure Cryptographic Storage',
        'Security Misconfiguration',
        'Insecure Direct Object References',
        'Server-Side Template Injection',
        'DNS Zone Transfer (AXFR Vulnerability)',
        'HTTP Request Smuggling',
        'Mobile Application Security Vulnerabilities:',
        'Weak Server Side Controls',
        'Lack of Binary Protections',
        'Insecure Data Storage',
        'Unintended Data Leakage',
        'Poor Authorization and Authentication',
        'Not Listed',
      ],

      rules: {
        required: [(value) => !!value || 'This Field Is Required'],
        name: [
          (v) => !!v || 'Name is required',
          (v) =>
            (v && v.length <= 100) || 'Name must be less than 100 characters',
        ],
        phone: [
          (v) => !!v || 'Phone number is required',
          (v) =>
            !v ||
            /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(
              v
            ) ||
            'Invalid Phone number',
        ],
        email: [
          (v) => !!v || 'E-mail is required',
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'E-mail must be valid',
        ],
      },

      breadcrumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        {
          text: 'Report Vulnerability',
          disabled: true,
          to: '/prrogram/add/',
        },
      ],
    }
  },

  created() {
    console.log(this.program.companyId._id)
    const scopes = this.program.scope
    if (this.program.scope.length === 0) {
      this.scopes = ['No data']

      return
    }

    let index = 0
    this.scopes =
      scopes.map((element) => {
        let temp = ''
        Object.entries(element).forEach((entry) => {
          temp += `<${entry[0].toUpperCase()}: ${entry[1]}>\t`
        })

        return { label: temp, index: ++index }
      }) || 'No Data'
  },

  methods: {
    clearPreview() {
      this.descriptionPreview = null
    },

    previewdescription() {
      const converter = new showdown.Converter()
      this.descriptionPreview = converter.makeHtml(this.FORM.description)
    },

    async submitReport() {
      if (this.$refs.form1.validate()) {
        this.$nuxt.$loading.start()

        const programId = this.$route.params.programId
        const PAYLOAD = {
          ...this.FORM,
          programId,
          reportedto: this.program.companyId._id,
          visibility: this.FORM.visibility ? 'Public' : 'Private',
        }

        const formData = new FormData()
        formData.append('title', `${this.FORM.title}`)
        formData.append('description', `${this.FORM.description}`)
        formData.append('reportedto', `${this.program.companyId._id}`)
        formData.append('scope', `${this.FORM.scope}`)
        formData.append('cveid', `${this.FORM.cveid}`)
        formData.append('bugtype', `${this.FORM.bugtype}`)
        formData.append('notification', `${this.FORM.notification}`)
        formData.append(
          'visibility',
          this.FORM.visibility ? 'Public' : 'Private'
        )
        // formData.append('files', `${this.fileArray}`)

        for (const file of this.fileArray) {
          formData.append('files', file)
        }

        // if (this.fileArray.length > 0) {
        //   // const newFileArray = this.handleAttachment(this.FORM.attachments)
        //   for (let index = 0; index < this.fileArray.length; index++) {
        //     formData.append('files', `${this.fileArray[index]}`)
        //   }
        // }

        // patch for scope field until backend make it OPTIONAL
        PAYLOAD.scope = PAYLOAD.scope ? PAYLOAD.scope : 'None'

        const URL = `/create-submission/${programId}`
        // Make upload request to the API
        await this.$axios
          .$post(URL, formData)
          .then((res) => {
            this.dialog = true
          })
          .catch((error) => {
            this.$store.commit('notification/SHOW', {
              color: 'accent',
              icon: 'mdi-alert-outline',
              text: error.response
                ? error.response.data.message
                : 'Something occured. Please try again',
            })
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },
    handleAttachment(input) {
      console.log(input)
      if (input.length <= 5) {
        const attachment = input
        const allowedFileType = ['pdf', 'png', 'jpg', 'zip', 'rar']
        for (let index = 0; index < attachment.length; index++) {
          const fileChecker = attachment[index].name.substring(
            attachment[index].name.lastIndexOf('.') + 1,
            attachment[index].name.length
          )
          if (
            allowedFileType.includes(fileChecker) &&
            attachment[index].size <= 52428800
          ) {
            this.fileArray.push(attachment[index])
          } else {
            this.$store.commit('notification/SHOW', {
              color: 'accent',
              icon: 'mdi-alert-outline',
              text:
                'One or more invalid files or file size. Accepted files are pdf, jpg, jpeg, png, zip or rar',
            })
          }
        }
      } else {
        this.$store.commit('notification/SHOW', {
          color: 'accent',
          icon: 'mdi-alert-outline',
          text: 'only a Maximum of 5 files can be uploaded',
        })
      }
    },
  },
}
</script>
