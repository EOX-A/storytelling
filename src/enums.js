const SAMPLE_COMPONENTS = [
  {
    name: "Basic",
    components: [
      {
        name: "Textual",
        icon: "data:image/svg+xml,%3Csvg fill='none' viewBox='0 0 138 112' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23F2F2F2' rx='4' height='112' width='138'/%3E%3Crect x='27' y='22' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='27' y='34' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='27' y='46' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='27' y='58' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='27' y='70' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='27' y='82' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3C/svg%3E",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Simple Table",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 137 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='137' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='28' y='24' width='81' height='63' rx='2' stroke='%235E5E5E' stroke-width='4'/%3E%3Cline x1='50.5' y1='25' x2='50.5' y2='87' stroke='%235E5E5E' stroke-width='3'/%3E%3Cline x1='69.5' y1='25' x2='69.5' y2='87' stroke='%235E5E5E' stroke-width='3'/%3E%3Cline x1='88.5' y1='25' x2='88.5' y2='87' stroke='%235E5E5E' stroke-width='3'/%3E%3Cline x1='30' y1='56.5' x2='109' y2='56.5' stroke='%235E5E5E' stroke-width='3'/%3E%3Cline x1='30' y1='72.5' x2='109' y2='72.5' stroke='%235E5E5E' stroke-width='3'/%3E%3Cpath d='M30 40.5L109 40.5' stroke='%235E5E5E' stroke-width='3'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Text with Button",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 137 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='137' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='26' y='22' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='26' y='34' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='26' y='46' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='26' y='58' width='84' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='26' y='73' width='84' height='14' rx='7' fill='%23D9D9D9'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "List Items",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='38' y='22' width='73' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='38' y='34' width='73' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='38' y='46' width='73' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='38' y='58' width='73' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='38' y='70' width='73' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='38' y='82' width='73' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Ccircle cx='30.5' cy='25.5' r='3.5' fill='%23BFBFBF'/%3E%3Ccircle cx='30.5' cy='37.5' r='3.5' fill='%23BFBFBF'/%3E%3Ccircle cx='30.5' cy='49.5' r='3.5' fill='%23BFBFBF'/%3E%3Ccircle cx='30.5' cy='61.5' r='3.5' fill='%23BFBFBF'/%3E%3Ccircle cx='30.5' cy='73.5' r='3.5' fill='%23BFBFBF'/%3E%3Ccircle cx='30.5' cy='85.5' r='3.5' fill='%23BFBFBF'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
    ]
  },
  {
    name: "Map",
    components: [
      {
        name: "Simple",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='11' y='11' width='116' height='90' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M54.08 42.873L56.58 52.373C57.83 57.123 65.08 59.373 69.58 59.373C73.18 59.373 74.7467 63.0397 75.08 64.873C74.08 68.0397 73.48 74.373 79.08 74.373C84.68 74.373 85.08 70.7064 84.58 68.873L80.58 59.373C78.2467 56.5397 73.58 49.473 73.58 43.873C73.58 38.2729 69.9134 37.873 68.08 38.373C64.08 42.373 60.4134 40.0397 59.08 38.373C54.28 36.773 53.7467 40.7063 54.08 42.873Z' fill='%235E5E5E'/%3E%3Cpath d='M59.0891 62.4676C58.5923 65.8092 60.2794 68.2359 61.5214 68.4348C66.4893 71.7763 70.4738 69.4293 71.5088 68.4348C72.9992 66.5253 71.7634 63.0643 70.5214 62.4676C68.5343 62.945 64.5564 63.661 63.5214 62.4676C62.031 60.5581 60.0214 60.4641 59.0891 62.4676Z' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Tour",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='27' y='22' width='84' height='67' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M65.08 35.873L67.58 45.373C68.83 50.123 76.08 52.373 80.58 52.373C84.18 52.373 85.7467 56.0397 86.08 57.873C85.08 61.0397 84.48 67.373 90.08 67.373C95.68 67.373 96.08 63.7064 95.58 61.873L91.58 52.373C89.2467 49.5397 84.58 42.473 84.58 36.873C84.58 31.2729 80.9134 30.873 79.08 31.373C75.08 35.373 71.4134 33.0397 70.08 31.373C65.28 29.773 64.7467 33.7063 65.08 35.873Z' fill='%235E5E5E'/%3E%3Cpath d='M70.0891 55.4676C69.5923 58.8092 71.2794 61.2359 72.5214 61.4348C77.4893 64.7763 81.4738 62.4293 82.5088 61.4348C83.9992 59.5253 82.7634 56.0643 81.5214 55.4676C79.5343 55.945 75.5564 56.661 74.5214 55.4676C73.031 53.5581 71.0214 53.4641 70.0891 55.4676Z' fill='%235E5E5E'/%3E%3Crect x='34' y='67' width='26' height='16' rx='2' fill='%23F2F2F2'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Sidecar",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='56.2718' y='22' width='54.7282' height='67' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M67.7131 41.873L70.2947 51.373C71.5854 56.123 79.0718 58.373 83.7185 58.373C87.4359 58.373 89.0537 62.0397 89.3979 63.873C88.3653 67.0397 87.7457 73.373 93.5283 73.373C99.3109 73.373 99.724 69.7064 99.2077 67.873L95.0772 58.373C92.6678 55.5397 87.849 48.473 87.849 42.873C87.849 37.2729 84.0627 36.873 82.1696 37.373C78.0392 41.373 74.253 39.0397 72.8762 37.373C67.9197 35.773 67.3689 39.7063 67.7131 41.873Z' fill='%235E5E5E'/%3E%3Cpath d='M72.8855 61.4676C72.3725 64.8092 74.1147 67.2359 75.3971 67.4348C80.527 70.7763 84.6415 68.4293 85.7102 67.4348C87.2492 65.5253 85.9731 62.0643 84.6906 61.4676C82.6387 61.945 78.5311 62.661 77.4624 61.4676C75.9234 59.5581 73.8482 59.4641 72.8855 61.4676Z' fill='%235E5E5E'/%3E%3Crect x='27' y='22' width='27' height='67' rx='4' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Container",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='11' y='22' width='116' height='67' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M54.08 42.873L56.58 52.373C57.83 57.123 65.08 59.373 69.58 59.373C73.18 59.373 74.7467 63.0397 75.08 64.873C74.08 68.0397 73.48 74.373 79.08 74.373C84.68 74.373 85.08 70.7064 84.58 68.873L80.58 59.373C78.2467 56.5397 73.58 49.473 73.58 43.873C73.58 38.2729 69.9134 37.873 68.08 38.373C64.08 42.373 60.4134 40.0397 59.08 38.373C54.28 36.773 53.7467 40.7063 54.08 42.873Z' fill='%235E5E5E'/%3E%3Cpath d='M59.0891 62.4676C58.5923 65.8092 60.2794 68.2359 61.5214 68.4348C66.4893 71.7763 70.4738 69.4293 71.5088 68.4348C72.9992 66.5253 71.7634 63.0643 70.5214 62.4676C68.5343 62.945 64.5564 63.661 63.5214 62.4676C62.031 60.5581 60.0214 60.4641 59.0891 62.4676Z' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Full",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='11' y='11' width='116' height='90' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M54.08 42.873L56.58 52.373C57.83 57.123 65.08 59.373 69.58 59.373C73.18 59.373 74.7467 63.0397 75.08 64.873C74.08 68.0397 73.48 74.373 79.08 74.373C84.68 74.373 85.08 70.7064 84.58 68.873L80.58 59.373C78.2467 56.5397 73.58 49.473 73.58 43.873C73.58 38.2729 69.9134 37.873 68.08 38.373C64.08 42.373 60.4134 40.0397 59.08 38.373C54.28 36.773 53.7467 40.7063 54.08 42.873Z' fill='%235E5E5E'/%3E%3Cpath d='M59.0891 62.4676C58.5923 65.8092 60.2794 68.2359 61.5214 68.4348C66.4893 71.7763 70.4738 69.4293 71.5088 68.4348C72.9992 66.5253 71.7634 63.0643 70.5214 62.4676C68.5343 62.945 64.5564 63.661 63.5214 62.4676C62.031 60.5581 60.0214 60.4641 59.0891 62.4676Z' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
    ]
  },
  {
    name: "Media",
    components: [
      {
        name: "Simple",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='27' y='22' width='84' height='67' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M69.5 39L73.2045 50.4012H85.1924L75.494 57.4476L79.1985 68.8488L69.5 61.8024L59.8015 68.8488L63.506 57.4476L53.8076 50.4012H65.7955L69.5 39Z' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Tour",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='27' y='22' width='84' height='67' rx='4' fill='%23D8D8D8'/%3E%3Crect x='34' y='67' width='26' height='16' rx='2' fill='%23F2F2F2'/%3E%3Cpath d='M83.5 32L87.2045 43.4012H99.1924L89.494 50.4476L93.1985 61.8488L83.5 54.8024L73.8015 61.8488L77.506 50.4476L67.8076 43.4012H79.7955L83.5 32Z' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Sidecar",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='56.2718' y='22' width='54.7282' height='67' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M84.5 39L88.2045 50.4012H100.192L90.494 57.4476L94.1985 68.8488L84.5 61.8024L74.8015 68.8488L78.506 57.4476L68.8076 50.4012H80.7955L84.5 39Z' fill='%235E5E5E'/%3E%3Crect x='27' y='22' width='27' height='67' rx='4' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Container",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='11' y='22' width='116' height='67' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M68.5 39L72.2045 50.4012H84.1924L74.494 57.4476L78.1985 68.8488L68.5 61.8024L58.8015 68.8488L62.506 57.4476L52.8076 50.4012H64.7955L68.5 39Z' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Full",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='11' y='11' width='116' height='90' rx='4' fill='%23D8D8D8'/%3E%3Cpath d='M69.5 40L73.2045 51.4012H85.1924L75.494 58.4476L79.1985 69.8488L69.5 62.8024L59.8015 69.8488L63.506 58.4476L53.8076 51.4012H65.7955L69.5 40Z' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Hero",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='11' y='11' width='116' height='90' rx='4' fill='%23D8D8D8'/%3E%3Crect x='35' y='49' width='69' height='7' rx='3.5' fill='%235E5E5E'/%3E%3Crect x='51' y='59' width='37' height='4' rx='2' fill='%23BEBEBE'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
      {
        name: "Iframe",
        icon: "data:image/svg+xml,%3Csvg viewBox='0 0 138 112' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='138' height='112' rx='4' fill='%23F2F2F2'/%3E%3Crect x='27' y='22' width='84' height='67' rx='4' fill='%235E5E5E'/%3E%3Crect x='31' y='26' width='76' height='59' rx='4' fill='%23D8D8D8'/%3E%3Crect x='35' y='43' width='35' height='4.06977' rx='2.03488' fill='%235E5E5E'/%3E%3Crect x='35' y='50' width='39' height='4' rx='2' fill='%235E5E5E'/%3E%3Crect x='35' y='57' width='31' height='4' rx='2' fill='%235E5E5E'/%3E%3Crect x='35' y='64' width='24' height='4' rx='2' fill='%235E5E5E'/%3E%3C/svg%3E%0A",
        markdown: `
[sectionType]:basic
### Component 1 here
Some text here just sample
    `,
      },
    ]
  }
];

export { SAMPLE_COMPONENTS };
