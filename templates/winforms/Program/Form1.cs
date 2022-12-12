using Program.Classes;
using Program.Properties;

namespace Program
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // Load color settings
            DarkTitleBarClass.UseImmersiveDarkMode(Handle, true);
            this.BackColor = Properties.Settings.Default.bg_color;
            this.ForeColor = Properties.Settings.Default.fg_color;
        }
    }
}