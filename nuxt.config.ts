import Aura from '@primevue/themes/aura';
import Nora from '@primevue/themes/nora';
import Lara from '@primevue/themes/lara';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    usePrimeVue: true,
    components: {
      include: ['Button', 'DataTable', 'Column', 'CascadeSelect', 'Checkbox', 'ColorPicker', 'DatePicker', 'Editor',
        'FloatLabel', 'IconField', 'InputIcon', 'InputGroup', 'InputGroupAddon', 'InputNumber', 'InputOtp', 'InputText',
        'Knob', 'Listbox', 'MultiSelect', 'Password', 'RadioButton', 'Rating', 'Select', 'SelectButton', 'Slider', 'Textarea',
        'ToggleButton', 'ToggleSwitch', 'SpeedDial', 'SplitButton', 'DataView', 'OrganizationChart', 'Paginator',
        'Timeline', 'Tree', 
        // panel
        'Accordion', 'AccordionPanel', 'AccordionHeader', 'AccordionContent',
        'Card', 'Divider', 'Fieldset', 'Panel', 'ScrollPanel', 'Splitter', 'Toolbar',
        // step
        'Stepper', 'StepList', 'StepPanels', 'StepItem', 'Step', 'StepPanel',
        // tab
        'Tabs', 'TabList', 'Tab', 'TabPanels', 'TabPanel',
        // overlay
        'ConfirmDialog', 'Dialog', 'Drawer', 'DynamicDialog', 'Tooltip',
        // file
        'FileUpload',
        // chart
        'Chart',
        // menu
        'Breadcrumb', 'ContextMenu', 'Dock', 'Menu', 'Menubar', 'MegaMenu', 'PanelMenu', 'TieredMenu',
        // message 
        'Message', 'Toast',
        // media
        'Carousel', 'Galleria', 'Image',
        // misc
        'AnimateOnScroll', 'Avatar', 'AvatarGroup', 'OverlayBadge', 'Badge', 'MeterGroup', 
        'ScrollTop', 'ProgressBar', 'ProgressSpinner', 'StyleClass', 'Tag', 'Ripple',
        // terminal
        'Terminal', 'TerminalService'
      ]
    },
    options: {
      theme: {
          preset: Lara,
          cssLayer: false
      }
    }
  },
  css: ['~/assets/css/main.css'],
  plugins: ["~/plugins/common.ts"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-07-03',
})