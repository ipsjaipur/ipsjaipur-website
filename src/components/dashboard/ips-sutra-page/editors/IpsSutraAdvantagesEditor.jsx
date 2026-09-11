'use client';

import {
  Laptop, Trophy, GraduationCap, HandCoins, BrainCircuit, Plane, Factory,
  BadgeIndianRupee, Languages, BadgeCheck, Presentation, UserRoundCheck,
  MessagesSquare, CheckCircle2, School, Briefcase, Bot, TrendingUp, Megaphone,
  Globe, Users, Building2, Network, MessageSquare, DollarSign, BookOpen,
  Dumbbell, Lightbulb, Handshake, Star, Zap, Target, Award, Heart, Shield,
  Cpu, BarChart, FlaskConical, Rocket, Layers, Eye, Clock, MapPin, Phone,
  Mail, Tag, Flame, Leaf, Compass,
} from 'lucide-react';
import IpsSutraSectionEditorShell from '../IpsSutraSectionEditorShell';
import SortableList from '../../home-page/SortableList';

const ICON_OPTIONS = [
  { name: 'GraduationCap',   Icon: GraduationCap,   label: 'Graduation Cap'   },
  { name: 'HandCoins',        Icon: HandCoins,        label: 'Hand Coins'       },
  { name: 'BrainCircuit',     Icon: BrainCircuit,     label: 'Brain Circuit'    },
  { name: 'Plane',            Icon: Plane,            label: 'Plane'            },
  { name: 'Factory',          Icon: Factory,          label: 'Factory'          },
  { name: 'BadgeIndianRupee', Icon: BadgeIndianRupee, label: 'Badge Rupee'      },
  { name: 'Languages',        Icon: Languages,        label: 'Languages'        },
  { name: 'BadgeCheck',       Icon: BadgeCheck,       label: 'Badge Check'      },
  { name: 'Presentation',     Icon: Presentation,     label: 'Presentation'     },
  { name: 'UserRoundCheck',   Icon: UserRoundCheck,   label: 'User Check'       },
  { name: 'Laptop',           Icon: Laptop,           label: 'Laptop'           },
  { name: 'MessagesSquare',   Icon: MessagesSquare,   label: 'Messages Square'  },
  { name: 'Trophy',           Icon: Trophy,           label: 'Trophy'           },
  { name: 'CheckCircle2',     Icon: CheckCircle2,     label: 'Check Circle'     },
  { name: 'School',           Icon: School,           label: 'School'           },
  { name: 'Briefcase',        Icon: Briefcase,        label: 'Briefcase'        },
  { name: 'Bot',              Icon: Bot,              label: 'Bot / AI'         },
  { name: 'TrendingUp',       Icon: TrendingUp,       label: 'Trending Up'      },
  { name: 'Megaphone',        Icon: Megaphone,        label: 'Megaphone'        },
  { name: 'Globe',            Icon: Globe,            label: 'Globe'            },
  { name: 'Users',            Icon: Users,            label: 'Users / Team'     },
  { name: 'Building2',        Icon: Building2,        label: 'Building'         },
  { name: 'Network',          Icon: Network,          label: 'Network'          },
  { name: 'MessageSquare',    Icon: MessageSquare,    label: 'Message Square'   },
  { name: 'DollarSign',       Icon: DollarSign,       label: 'Dollar Sign'      },
  { name: 'BookOpen',         Icon: BookOpen,         label: 'Book'             },
  { name: 'Dumbbell',         Icon: Dumbbell,         label: 'Dumbbell'         },
  { name: 'Lightbulb',        Icon: Lightbulb,        label: 'Lightbulb'        },
  { name: 'Handshake',        Icon: Handshake,        label: 'Handshake'        },
  { name: 'Star',             Icon: Star,             label: 'Star'             },
  { name: 'Zap',              Icon: Zap,              label: 'Zap / Energy'     },
  { name: 'Target',           Icon: Target,           label: 'Target'           },
  { name: 'Award',            Icon: Award,            label: 'Award'            },
  { name: 'Heart',            Icon: Heart,            label: 'Heart'            },
  { name: 'Shield',           Icon: Shield,           label: 'Shield'           },
  { name: 'Cpu',              Icon: Cpu,              label: 'CPU / Tech'       },
  { name: 'BarChart',         Icon: BarChart,         label: 'Bar Chart'        },
  { name: 'FlaskConical',     Icon: FlaskConical,     label: 'Flask'            },
  { name: 'Rocket',           Icon: Rocket,           label: 'Rocket'           },
  { name: 'Layers',           Icon: Layers,           label: 'Layers'           },
  { name: 'Eye',              Icon: Eye,              label: 'Eye / Vision'     },
  { name: 'Clock',            Icon: Clock,            label: 'Clock'            },
  { name: 'MapPin',           Icon: MapPin,           label: 'Map Pin'          },
  { name: 'Phone',            Icon: Phone,            label: 'Phone'            },
  { name: 'Mail',             Icon: Mail,             label: 'Mail'             },
  { name: 'Tag',              Icon: Tag,              label: 'Tag'              },
  { name: 'Flame',            Icon: Flame,            label: 'Flame'            },
  { name: 'Leaf',             Icon: Leaf,             label: 'Leaf'             },
  { name: 'Compass',          Icon: Compass,          label: 'Compass'          },
];

const COLOR_OPTIONS = [
  { value: 'from-orange-500 to-orange-600', label: 'Orange'  },
  { value: 'from-blue-500 to-blue-600',     label: 'Blue'    },
  { value: 'from-green-500 to-green-600',   label: 'Green'   },
  { value: 'from-purple-500 to-purple-600', label: 'Purple'  },
  { value: 'from-pink-500 to-pink-600',     label: 'Pink'    },
  { value: 'from-red-500 to-red-600',       label: 'Red'     },
  { value: 'from-yellow-500 to-yellow-600', label: 'Yellow'  },
  { value: 'from-cyan-500 to-cyan-600',     label: 'Cyan'    },
];

function getIconEntry(name) {
  return ICON_OPTIONS.find((o) => o.name === name) || ICON_OPTIONS.find((o) => o.name === 'Lightbulb');
}

function IconPicker({ value, onChange }) {
  const selected      = getIconEntry(value);
  const SelectedIcon  = selected?.Icon || Lightbulb;
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        Icon
      </label>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#eb5905]/10 flex items-center justify-center shrink-0 border border-[#e2e8f0]">
          <SelectedIcon className="w-5 h-5 text-[#eb5905]" />
        </div>
        <select
          value={value || 'Lightbulb'}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
        >
          {ICON_OPTIONS.map(({ name, label }) => (
            <option key={name} value={name}>
              {label} ({name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ColorPicker({ value, onChange }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        Icon Color
      </label>
      <select
        value={value || 'from-orange-500 to-orange-600'}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
      >
        {COLOR_OPTIONS.map(({ value: v, label }) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

function AdvantageItem(item, _index, update) {
  return (
    <div className="space-y-3">
      <IconPicker value={item.iconName || 'Lightbulb'} onChange={(iconName) => update({ iconName })} />
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Advantage Text
        </label>
        <textarea
          rows={2}
          value={item.text || ''}
          onChange={(e) => update({ text: e.target.value })}
          placeholder="Hindi or English advantage text…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      </div>
      <ColorPicker value={item.color || 'from-orange-500 to-orange-600'} onChange={(color) => update({ color })} />
    </div>
  );
}

function Field({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
      />
    </div>
  );
}

export default function IpsSutraAdvantagesEditor() {
  return (
    <IpsSutraSectionEditorShell
      sectionKey="advantages"
      title="IPS Advantages Section"
      description="Section heading, Apply Now button, and the advantage cards grid."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            {/* Header */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Header</h2>
              <Field
                label="Section Heading"
                value={data?.advantagesHeading}
                onChange={set('advantagesHeading')}
                placeholder="IPS Advantages"
              />
              <p className="text-[12px] text-[#77838f]">
                Tip: The last word of the heading is automatically highlighted in orange (e.g. &quot;IPS{' '}
                <strong>Advantages</strong>&quot;).
              </p>
            </div>

            {/* Apply Button */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Apply Now Button</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Button Text"
                  value={data?.advantagesApplyText}
                  onChange={set('advantagesApplyText')}
                  placeholder="Apply Now"
                />
                <Field
                  label="Button URL"
                  value={data?.advantagesApplyHref}
                  onChange={set('advantagesApplyHref')}
                  placeholder="https://admissions.ipsedu.in/"
                />
              </div>
            </div>

            {/* Advantages List */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Advantage Cards</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Drag to reorder. Each card has an icon, text, and icon background color.
              </p>
              <SortableList
                items={data?.advantages || []}
                onChange={(advantages) => setData({ ...data, advantages })}
                renderItem={AdvantageItem}
                onAdd={() => ({
                  iconName: 'Lightbulb',
                  text: '',
                  color: 'from-orange-500 to-orange-600',
                  order: 0,
                })}
                addLabel="Add Advantage"
              />
            </div>
          </>
        );
      }}
    </IpsSutraSectionEditorShell>
  );
}
