<template>
  <main v-if="program">
    <form action=""></form>
    <v-breadcrumbs
      large
      divider="»"
      :items="breadcrumbsItems"
      class="pa-0 py-4"
    />

    <article class="pb-8">
      <program-item-list-card :program="program" show-visibility />
    </article>

    <!-- <div v-if="program">{{ program }}</div> -->
    <!-- {{ program.companyId }} -->

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
            <!--            <v-autocomplete-->
            <!--              v-model="FORM.scope"-->
            <!--              label="Target Scope"-->
            <!--              :items="scopes"-->
            <!--              outlined-->
            <!--              filled-->
            <!--            >-->
            <!--              <template v-slot:item="data">-->
            <!--                <v-list-item-content>-->
            <!--                  <v-list-item-title v-html="data.item.options">-->
            <!--                  </v-list-item-title>-->
            <!--                  <v-list-item-subtitle-->
            <!--                    v-html="data.item.label"-->
            <!--                  ></v-list-item-subtitle>-->
            <!--                </v-list-item-content>-->
            <!--              </template>-->
            <!--            </v-autocomplete>-->

            <div class="autocomplete">
              <div
                :class="isVisible ? 'outline' : 'inline'"
                class="input"
                @click="toggleVisiblity"
              >
                <span v-if="selectedScope"
                  >{{ selectedScope.options }} - {{ selectedScope.label }}</span
                >
                <span v-else>Target Scope</span>
                <div class="drop-down-icon">
                  <svg
                    v-show="!isVisible"
                    class="drop-up"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"
                    />
                  </svg>
                  <svg
                    v-show="isVisible"
                    class="drop-down"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"
                    />
                  </svg>
                </div>
              </div>
              <div
                v-show="isVisible"
                :class="isVisible ? 'outline' : 'inline'"
                class="popover"
              >
                <input
                  v-model="query"
                  placeholder="Search for scope"
                  class="input-search form-group form-control"
                  type="text"
                />
                <div v-if="filteredScope.length === 0" class="no-data">
                  No data Available
                </div>
                <div class="options">
                  <ul>
                    <li
                      v-for="(option, index) in filteredScope"
                      :key="index"
                      @click="clientClicked(option)"
                    >
                      <span class="option">{{ option.options }}</span>
                      <span class="label">{{ option.label }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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

          <!-- <section>
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
          </section> -->

          <v-row>
            <v-col cols="12">
              <div class="headline pb-4">CVSS Identifier</div>
              <v-slider
                v-model="FORM.cveid"
                thumb-label
                max="5.0"
                min="0.0"
                step="0.1"
                ticks
                hide-details
                :rules="[...rules.required]"
              >
                <template #append>
                  <v-text-field
                    v-model="FORM.cveid"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    :rules="[...rules.required]"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
          </v-row>

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
                You can attach multiple files (up to 5). Please keep individual
                upload size under 400MB.
              </div>
            </header>

            <v-file-input
              ref="attachments"
              v-model="FORM.attachments"
              chips
              block
              outlined
              multiple
              label="Attachments"
              @change="handleAttachment"
            />
            <!--            <div class="">-->
            <!--              <v-btn-->
            <!--                small-->
            <!--                color="error"-->
            <!--                @click="-->
            <!--                  () => {-->
            <!--                    fileArray = []-->
            <!--                  }-->
            <!--                "-->
            <!--                >Clear Attachments</v-btn-->
            <!--              >-->
            <!--            </div>-->
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

      <div class="py-6">
        <v-btn
          text
          large
          color="accent"
          class="px-2 py-1"
          @click="$router.go(-1)"
        >
          Cancel
        </v-btn>

        <v-btn large color="primary" class="px-2 py-1" @click="submitReport()">
          Submit Report
        </v-btn>
      </div>
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
      isVisible: false,
      query: '',
      selectedScope: null,
      dialog: false,
      validate: true,
      descriptionPreview: null,
      fileArray: [],

      program: null,
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
          to: '/program/add/',
        },
      ],
    }
  },
  async fetch() {
    // const program = await fetch(
    //   `/company/get-program/${this.$route.params.programId}`
    // ).then((res) => res)
    // console.log(this.$route.params)
    // console.log(program)

    const URL = `/get-programs?limit=15`
    // Make upload request to the API
    await this.$axios
      .$get(URL)
      .then((res) => {
        const mainProgram = res.data.docs.filter((program) => {
          // return program._id === this.$route.params.programId
          return (
            program.title.toLowerCase().replace(/ /g, '-') ===
            this.$route.params.programId
          )
        })
        this.program = mainProgram[0]
        if (this.program.scope.length === 0) {
          this.scopes = ['No data']
        }
        this.getScopeOptions(this.program.scope)
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },
  computed: {
    filteredScope() {
      const searchTerm = this.query.toLowerCase()
      if (searchTerm === '') {
        return this.scopes
      }
      return this.scopes.filter((item) => {
        return Object.values(item).some((word) =>
          String(word).toLowerCase().includes(searchTerm)
        )
      })
    },
  },

  // created() {
  //   console.log('created', this.program)
  //   this.program = this.$store.state.program.data
  // },

  // updated() {
  //   console.log('updated', this.program)
  //   this.program = this.$store.state.program.data
  // },

  // mounted() {
  //   console.log('mounted', this.program)
  //   this.program = this.$store.state.program.data
  //   // const clearAttach = document.getElementsByClassName('v-input__icon--clear')
  // },
  methods: {
    clearPreview() {
      this.descriptionPreview = null
    },
    toggleVisiblity() {
      this.isVisible = !this.isVisible
    },
    clientClicked(option) {
      this.selectedScope = option
      this.isVisible = false
    },
    getScopeOptions(scopeList) {
      const filler = []
      for (let i = 0; i < scopeList.length; i++) {
        for (const [key, value] of Object.entries(scopeList[i])) {
          const optionFiller = {
            label: `${key}`,
            options: value,
          }
          filler.push(optionFiller)
        }
      }
      this.scopes = filler || 'No Scope data'
    },
    previewdescription() {
      const converter = new showdown.Converter()
      this.descriptionPreview = converter.makeHtml(this.FORM.description)
    },

    async submitReport() {
      console.log(this.$refs.form1)
      if (this.$refs.form1.validate()) {
        this.$nuxt.$loading.start()

        const programId = this.$route.params.programId
        const PAYLOAD = {
          ...this.FORM,
          programId,
          // reportedto: this.program.companyId._id,
          reportedto: 'this.program.companyId._id',
          visibility: this.FORM.visibility ? 'Public' : 'Private',
        }

        const formData = new FormData()
        formData.append('title', `${this.FORM.title}`)
        formData.append('description', `${this.FORM.description}`)
        // formData.append('reportedto', `${this.program.companyId._id}`)
        formData.append('reportedto', 'this.program.companyId._id')
        formData.append('scope', `${this.selectedScope.options}`)
        formData.append('cveid', `${this.FORM.cveid}`)
        formData.append('bugtype', `${this.FORM.bugtype}`)
        formData.append('notification', `${this.FORM.notification}`)
        formData.append(
          'visibility',
          this.FORM.visibility ? 'Public' : 'Private'
        )
        // formData.append('files', `${this.fileArray}`)
        //
        for (const file of this.fileArray) {
          formData.append('files', file)
        }

        // patch for scope field until backend make it OPTIONAL
        PAYLOAD.scope = PAYLOAD.scope ? PAYLOAD.scope : 'None'

        const URL = `/create-submission/${programId}`
        // Make upload request to the API
        await this.$axios
          .$post(URL, formData)
          .then((res) => {
            this.dialog = true
            console.log('Successful')
          })
          .catch((error) => {
            console.log(error)
            this.$store.dispatch('notification/failureSnackbar', error)
          })
          .finally(() => {
            console.log('Finally')
            this.$nuxt.$loading.finish()
          })
      }
    },
    handleAttachment(input) {
      if (input.length <= 5) {
        const attachment = input
        const allowedFileType = ['pdf', 'png', 'jpg', 'jpeg', 'zip', 'rar']
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
            this.$store.dispatch(
              'notification/warningSnackbar',
              'One or more invalid files or file size. Accepted files are pdf, jpg, jpeg, png, zip or rar'
            )
          }
        }
      } else {
        this.$store.dispatch(
          'notification/warningSnackbar',
          'only a Maximum of 5 files can be uploaded'
        )
      }
    },
  },
}
</script>

<style scoped lang="scss">
.autocomplete {
  min-width: 350px !important;
  position: relative;
  margin-bottom: 10px;
  //height: 38px;

  .input {
    height: 56px;
    border-radius: 3px;
    border: 2px solid lightgray;
    box-shadow: 0 0 10px #eceaea;
    padding: 5px 10px;
    cursor: text;
    width: 100% !important;
    font-size: 16px;
    position: relative;
    display: flex;
    align-items: center;

    .drop-down-icon {
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 15px;
    }
  }
  .outline {
    border: 2px solid #c504da;
  }
  .inline {
    border: 2px solid lightgray;
  }

  .popover {
    position: absolute;
    border: 2px solid lightgray;
    top: 58px;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 3px;
    text-align: center;
    max-width: 100%;
    padding: 10px;
    z-index: 30;

    .no-data {
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-shadow: 0 0 10px #4c4040;
      padding: 15px;
    }

    .input-search {
      width: 100% !important;
      border: 1px solid lightgray;
      border-radius: 3px;
      padding: 10px;

      &:focus {
        outline: 2px solid #c504da;
      }
    }

    .options {
      max-height: 180px;
      overflow-y: scroll;
      margin-top: 5px;

      ul {
        list-style-type: none;
        text-align: left;
        padding-left: 0;

        li {
          border-bottom: 1px solid lightgray;
          padding: 10px;
          cursor: pointer;
          background: #f1f1f1;

          .option {
            display: block;
            font-weight: 400;
          }
          .label {
            font-size: 12px;
          }

          &:hover {
            background: lightgray;
            color: #000;
            .option {
              display: block;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
