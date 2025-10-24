export interface Mod {
  id: string
  name: string
  gearType:
    | "helmet"
    | "mask"
    | "torso"
    | "gloves"
    | "bottoms"
    | "shoes"
    | "weapon"
  modType: string
  description: string
  stats: {
    [key: string]: number | string
  }
}

export const modsData: Mod[] = [
  // Weapon Mods
  {
    id: "burning-wrath",
    name: "Burning Wrath",
    gearType: "weapon",
    modType: "Burn",
    description: "Triggering Burn has a 25% chance to grant +1 Burn stacks",
    stats: {},
  },
  {
    id: "flame-resonance",
    name: "Flame Resonance",
    gearType: "weapon",
    modType: "Burn",
    description: "Max Burn stack +2, Burn duration -20.0%",
    stats: {},
  },
  {
    id: "blaze-blessing",
    name: "Blaze Blessing",
    gearType: "weapon",
    modType: "Burn",
    description: "When defeating an enemy affected by Burn, recover 5% HP.",
    stats: {},
  },
  {
    id: "embers",
    name: "Embers",
    gearType: "weapon",
    modType: "Burn",
    description: "When Burn is removed, stacks only -50%",
    stats: {},
  },
  {
    id: "frosty-blessing",
    name: "Frosty Blessing",
    gearType: "weapon",
    modType: "Frost Vortex",
    description: "When Frost Vortex disappears, restore 10% of HP.",
    stats: {},
  },
  {
    id: "cryo-catalyst",
    name: "Cryo Catalyst",
    gearType: "weapon",
    modType: "Frost Vortex",
    description:
      "Frost Vortex DMG +10%, After triggering Frost Construct (Ice Spike, Ice Missile, Ice Crystal) Frost Vortex DMG +5%",
    stats: {},
  },
  {
    id: "shattering-ice",
    name: "Shattering Ice",
    gearType: "weapon",
    modType: "Frost Vortex",
    description:
      "When an enemy at the center of the Frost Vortex is defeated, deal 50% Psi Intensity Ice DMG to enemies within 1m 1 time.",
    stats: {},
  },
  {
    id: "cryo-blast",
    name: "Cryo Blast",
    gearType: "weapon",
    modType: "Frost Vortex",
    description:
      "After triggering a Frost Vortex, Frost Vortex DMG +4% for 4s. Up to 5 stacks (20% total)",
    stats: {},
  },
  {
    id: "surge-amplifier",
    name: "Surge Amplifier",
    gearType: "weapon",
    modType: "Power Surge",
    description:
      "Dealing Power Surge DMG grants Power Surge DMG +5% for 3s, up to 4 stack(s).",
    stats: {},
  },
  {
    id: "static-shock",
    name: "Static Shock",
    gearType: "weapon",
    modType: "Power Surge",
    description: "Power Surge Status duration -50%, Power Surge DMG +20%.",
    stats: {},
  },
  {
    id: "shock-diffusion",
    name: "Shock Diffusion",
    gearType: "weapon",
    modType: "Power Surge",
    description:
      "When triggering Power Surge, apply the Power Surge status to 1 enemy within 10m of the target (prioritizes enemies that are not affected by Power Surge status).",
    stats: {},
  },
  {
    id: "shock-rampage",
    name: "Shock Rampage",
    gearType: "weapon",
    modType: "Power Surge",
    description:
      "Dealing Power Surge DMG grants +5% Power Surge Trigger Chance (based on weapon's Trigger Chance) for 5s. Effect can stack up to 4 times.",
    stats: {},
  },
  {
    id: "heavy-explosives",
    name: "Heavy Explosives",
    gearType: "weapon",
    modType: "Unstable Bomber",
    description:
      "Unstable Bomber inflicts stagger on enemies and deals 40% less damage to you.",
    stats: {},
  },
  {
    id: "bombardier-souvenir",
    name: "Bombardier Souvenir",
    gearType: "weapon",
    modType: "Unstable Bomber",
    description:
      "When triggering Unstable Bomber, automatically refill 10% of your magazine.",
    stats: {},
  },
  {
    id: "reckless-bomber",
    name: "Reckless Bomber",
    gearType: "weapon",
    modType: "Unstable Bomber",
    description: "For every 1% Crit Rate, Unstable Bomber DMG +0.5%",
    stats: {},
  },
  {
    id: "super-charged",
    name: "Super Charged",
    gearType: "weapon",
    modType: "Unstable Bomber",
    description:
      "Triggering Unstable Bomber grants Unstable Bomber DMG +5% for 3s. Effect can stack up to 6 times.",
    stats: {},
  },
  {
    id: "delayed-blast",
    name: "Delayed Blast",
    gearType: "weapon",
    modType: "Unstable Bomber",
    description:
      "Before the bomb explodes, for every 5 hits taken, the bomb's Ultimate DMG +25%",
    stats: {},
  },
  {
    id: "explosive-shrapnel",
    name: "Explosive Shrapnel",
    gearType: "weapon",
    modType: "Shrapnel",
    description:
      "The 20th Shrapnel is explosive and deals +300% DMG with guaranteed critical hit.",
    stats: {},
  },
  {
    id: "shield-breaker",
    name: "Shield Breaker",
    gearType: "weapon",
    modType: "Shrapnel",
    description: "When hitting a shielded enemy, Shrapnel DMG +60% for 1s",
    stats: {},
  },
  {
    id: "shrapnel-souvenir",
    name: "Shrapnel Souvenir",
    gearType: "weapon",
    modType: "Shrapnel",
    description:
      "When Shrapnel hits a Weakspot, automatically refills 1 bullet from inventory.",
    stats: {},
  },
  {
    id: "shatter-them-all",
    name: "Shatter Them All",
    gearType: "weapon",
    modType: "Shrapnel",
    description:
      "The more parts the Shrapnel hits, the higher the Shrapnel DMG. Each part +15%. Up to 45%.",
    stats: {},
  },
  {
    id: "shrapnel-smash",
    name: "Shrapnel Smash",
    gearType: "weapon",
    modType: "Shrapnel",
    description:
      "Triggering Shrapnel grants +1.0% Shrapnel Crit Rate for 2 seconds, up to 20 stacks",
    stats: {},
  },
  {
    id: "thunderclap",
    name: "Thunderclap",
    gearType: "weapon",
    modType: "Power Surge",
    description:
      "After triggering Power Surge 20 times, the next hit summons Celestial Thunder (Shock DMG of 200% PSI Intensity).",
    stats: {},
  },
  {
    id: "first-electrocution",
    name: "First Electrocution",
    gearType: "weapon",
    modType: "Power Surge",
    description:
      "For enemies without Power Surge status, Power Surge's Ultimate DMG +30%",
    stats: {},
  },
  {
    id: "explosive-barrage",
    name: "Explosive Barrage",
    gearType: "weapon",
    modType: "Fast Gunner",
    description:
      "When in Fast Gunner state, Crit Rate +10%, and Weapon DMG +10%.",
    stats: {},
  },
  {
    id: "blitzkrieg",
    name: "Blitzkrieg",
    gearType: "weapon",
    modType: "Fast Gunner",
    description:
      "Fast Gunner stacks +5 and additional Fire Rate +1% for each stack",
    stats: {},
  },
  {
    id: "cowboy",
    name: "Cowboy",
    gearType: "weapon",
    modType: "Fast Gunner",
    description:
      "After reloading when the magazine is empty, Fast Gunner trigger chance +100% (based on the weapon's Trigger Chance) for 5s. When Fast Gunner reaches max stacks, the duration is increased by 5s.",
    stats: {},
  },
  {
    id: "shoot-out",
    name: "Shoot Out",
    gearType: "weapon",
    modType: "Fast Gunner",
    description:
      "When triggering Fast Gunner, Weapon DMG +1.5% for 10s, up to 20 stack(s).",
    stats: {},
  },
  {
    id: "shooting-blitz",
    name: "Shooting Blitz",
    gearType: "weapon",
    modType: "Fast Gunner",
    description:
      "Fast Gunner duration +4s. When Fast Gunner is active, Weapon DMG +15%.",
    stats: {},
  },
  {
    id: "precision-rush",
    name: "Precision Rush",
    gearType: "weapon",
    modType: "Fast Gunner",
    description:
      "When Fast Gunner is active, increase Weakspot DMG while continuously shooting for 3s, up to 45%",
    stats: {},
  },
  {
    id: "recover-mark",
    name: "Recover Mark",
    gearType: "weapon",
    modType: "The Bull's Eye",
    description:
      "When defeating marked enemies, recover 15% HP and 25% Stamina.",
    stats: {},
  },
  {
    id: "hunters-perk",
    name: "Hunter's Perk",
    gearType: "weapon",
    modType: "The Bull's Eye",
    description: "Marked enemies DMG vs. Metas -20%.",
    stats: {},
  },
  {
    id: "vulnerability-amplifier",
    name: "Vulnerability Amplifier",
    gearType: "weapon",
    modType: "The Bull's Eye",
    description: "The Bull's Eye adds Vulnerability +8%.",
    stats: {},
  },
  {
    id: "spreading-marks",
    name: "Spreading Marks",
    gearType: "weapon",
    modType: "The Bull's Eye",
    description:
      "When a marked enemy is defeated, The Bull's Eye will spread to 1 enemies within 15m.",
    stats: {},
  },
  {
    id: "united-we-stand",
    name: "United We Stand",
    gearType: "weapon",
    modType: "Fortress Warfare",
    description:
      "The more players inside the Fortress Warfare, the greater the Weapon DMG bonus, up to 40%",
    stats: {},
  },
  {
    id: "final-territory",
    name: "Final Territory",
    gearType: "weapon",
    modType: "Fortress Warfare",
    description:
      "When Fortress Warfare ends, Weapon DMG +10%, Movement Speed +10% for 10s",
    stats: {},
  },
  {
    id: "durable-territory",
    name: "Durable Territory",
    gearType: "weapon",
    modType: "Fortress Warfare",
    description:
      "Every enemy defeated while in Fortress Warfare state will extend the effect by 5s (up to 5 times for every Fortress Warfare)",
    stats: {},
  },
  {
    id: "portable-territory",
    name: "Portable Territory",
    gearType: "weapon",
    modType: "Fortress Warfare",
    description:
      "After leaving Fortress Warfare, the status will remain for 2s.",
    stats: {},
  },
  {
    id: "multi-bounce",
    name: "Multi Bounce",
    gearType: "weapon",
    modType: "Bounce",
    description:
      "The more Bounces, the higher the damage, up to +45% (7.5% per Bounce).",
    stats: {},
  },
  {
    id: "bounce-rampage",
    name: "Bounce Rampage",
    gearType: "weapon",
    modType: "Bounce",
    description:
      "The more selectable targets Bounce has, the higher Bounce DMG, up to 45% (15% per target).",
    stats: {},
  },
  {
    id: "boomerang-bullet",
    name: "Boomerang Bullet",
    gearType: "weapon",
    modType: "Bounce",
    description:
      "Each time Bounce deals damage, its trigger chance +2% (based on the weapon's trigger chance), lasting 5s and stacking up to 10 times.",
    stats: {},
  },
  {
    id: "super-bullet",
    name: "Super Bullet",
    gearType: "weapon",
    modType: "Bounce",
    description: "Bounce Crit Rate +10%, Bounce Crit DMG + 25%",
    stats: {},
  },

  // Helmet Mods
  {
    id: "fateful-strike",
    name: "Fateful Strike",
    gearType: "helmet",
    modType: "Crit Rate",
    description: "Cannot deal Weakspot DMG. Crit rate +10% and Crit DMG +30%",
    stats: {},
  },
  {
    id: "deviation-expert",
    name: "Deviation Expert",
    gearType: "helmet",
    modType: "Fire Rate",
    description: "Range -25%, Fire Rate +10%, Status DMG +20%",
    stats: {},
  },
  {
    id: "elemental-havoc",
    name: "Elemental Havoc",
    gearType: "helmet",
    modType: "Conditional Elemental DMG",
    description: "Elemental DMG +10%. When HP is above 90%, 10% additionally.",
    stats: {},
  },
  {
    id: "momentum-up",
    name: "Momentum Up",
    gearType: "helmet",
    modType: "Fire Rate Weapon DMG",
    description:
      "Fire Rate 10%+ for the first 50% of the magazine and Weapon DMG +30% for the next 50% of the magazine.",
    stats: {},
  },
  {
    id: "precise-strike",
    name: "Precise Strike",
    gearType: "helmet",
    modType: "Weakspot DMG",
    description:
      "Hitting Weakspots grants +12.0% Weakspot DMG for 3 seconds, up to 3 stacks",
    stats: {},
  },
  {
    id: "work-of-proficiency",
    name: "Work of Proficiency",
    gearType: "helmet",
    modType: "Elemental DMG",
    description:
      "Reloading an empty mag grants 10% Reload Speed and +20.0% Elemental DMG, lasting until the next reload",
    stats: {},
  },
  {
    id: "mag-expansion",
    name: "Mag Expansion",
    gearType: "helmet",
    modType: "Magazine Capacity",
    description: "When the magazine is empty, Magazine Capacity 30%+",
    stats: {},
  },
  {
    id: "first-move-advantage",
    name: "First-Move Advantage",
    gearType: "helmet",
    modType: "Conditional Crit Rate Crit DMG",
    description: "After reloading, Crit Rate +10%, Crit DMG + 20% for 2s.",
    stats: {},
  },
  {
    id: "weapon-symphony",
    name: "Weapon Symphony",
    gearType: "helmet",
    modType: "Fire Rate Weapon DMG",
    description:
      "After switching weapons, Fire Rate +10% and Weapon DMG 25%. This effect decreases by 10% per second, up to a maximum decrease of 60%.",
    stats: {},
  },
  {
    id: "quick-toss",
    name: "Quick Toss",
    gearType: "helmet",
    modType: "Useless",
    description:
      "After using a throwable, Fire Rate +15% for 8s; reload 50% of the magazine for the previously equipped weapon (triggered every 12s)",
    stats: {},
  },

  // Mask Mods
  {
    id: "explosion",
    name: "Explosion",
    gearType: "mask",
    modType: "Burn",
    description:
      "When hitting Burning enemies, Crit Rate +8%, and Crit DMG +20%.",
    stats: {},
  },
  {
    id: "blaze-amplifier",
    name: "Blaze Amplifier",
    gearType: "mask",
    modType: "Burn",
    description: "Every stack of Burn grants +3% Psi Intensity DMG.",
    stats: {},
  },
  {
    id: "frost-construct",
    name: "Frost Construct",
    gearType: "mask",
    modType: "Frost Vortex",
    description:
      "Frost Constructs (Ice Spikes, Ice Missiles, Ice Crystals) deal +10% damage; if the target is in Frost Vortex status, damage dealt +10%.",
    stats: {},
  },
  {
    id: "frostwave-wither",
    name: "Frostwave Wither",
    gearType: "mask",
    modType: "Frost Vortex",
    description:
      "Frost Vortex's Final DMG +30%, decreasing by 8% every second overtime.",
    stats: {},
  },
  {
    id: "pinpoint-strike",
    name: "Pinpoint Strike",
    gearType: "mask",
    modType: "Unstable Bomber",
    description:
      "When Unstable Bomber hits only one enemy, Unstable Bomber Final DMG +25%.",
    stats: {},
  },
  {
    id: "shrapnel-carnage",
    name: "Shrapnel Carnage",
    gearType: "mask",
    modType: "Shrapnel",
    description:
      "The chance of Shrapnel hitting Weakspots is increased by 100.0%, with Weakspot DMG +25.0%",
    stats: {},
  },
  {
    id: "targeted-strike",
    name: "Targeted Strike",
    gearType: "mask",
    modType: "The Bull's Eye",
    description:
      "When hitting marked enemies, Crit Rate +10%, and Crit DMG 25%.",
    stats: {},
  },
  {
    id: "most-wanted",
    name: "Most Wanted",
    gearType: "mask",
    modType: "The Bull's Eye",
    description:
      "Every time an enemy is marked, Attack +5% for 8s. Effect can stack up to 3 times.",
    stats: {},
  },
  {
    id: "light-cannon",
    name: "Light Cannon",
    gearType: "mask",
    modType: "Fortress Warfare",
    description:
      "No Super Armor inside Fortress Warfare While in Fortress Warfare state, Attack +12%.",
    stats: {},
  },
  {
    id: "unbreakable",
    name: "Unbreakable",
    gearType: "mask",
    modType: "Fortress Warfare",
    description:
      "Fortress Warfare range -30%. While in Fortress Warfare state, Attack +15%",
    stats: {},
  },
  {
    id: "precision-bounce",
    name: "Precision Bounce",
    gearType: "mask",
    modType: "Bounce",
    description:
      "After triggering Bounce 6 times, the next bullet's Bounce DMG +125%.",
    stats: {},
  },
  {
    id: "break-bounce",
    name: "Break Bounce",
    gearType: "mask",
    modType: "Bounce",
    description:
      "When Bounce hits an enemy with HP above 50%, final Bounce DMG +25%.",
    stats: {},
  },

  // Torso Mods
  {
    id: "resist-advantage",
    name: "Resist Advantage",
    gearType: "torso",
    modType: "Defense",
    description:
      "When out of combat, gain 1 stack of DMG Reduction 10% every 10s. Effect can stack up to 5 times. 1 stack is removed when hit.",
    stats: {},
  },
  {
    id: "head-guard",
    name: "Head Guard",
    gearType: "torso",
    modType: "Defense",
    description:
      "Weakspot DMG Reduction +15%; Weakspot DMG Reduction +15% further when HP is above 60%.",
    stats: {},
  },
  {
    id: "healing-fortification",
    name: "Healing Fortification",
    gearType: "torso",
    modType: "Defense",
    description: "When using a healing shot, DMG Reduction 40% for 2s.",
    stats: {},
  },
  {
    id: "quick-comeback",
    name: "Quick Comeback",
    gearType: "torso",
    modType: "Defense",
    description:
      "When using a healing shot, Movement Speed +20% for 2s and refill the magazine from the inventory up to 100%.",
    stats: {},
  },
  {
    id: "enduring-shield",
    name: "Enduring Shield",
    gearType: "torso",
    modType: "Defense",
    description:
      "When out of combat, gain 1 stack of Safe Haven every 5s. Effect can stack up to 5 times. One shot received, removes 1 stack of Safe Haven to get 8% shield of your total max hp for 3s.",
    stats: {},
  },
  {
    id: "head-on-conflict",
    name: "Head-on Conflict",
    gearType: "torso",
    modType: "DMG Reduce",
    description:
      "Having enemies within 7 meters around you grants a 10% DMG Reduction. Taking melee DMG from enemies grants an extra 10.0% DMG Reduction for 5 seconds",
    stats: {},
  },
  {
    id: "critical-rescue",
    name: "Critical Rescue",
    gearType: "torso",
    modType: "Defense",
    description:
      "DMG Reduction 20% and Healing Received + 20% when HP is below 30%.",
    stats: {},
  },
  {
    id: "status-immune",
    name: "Status Immune",
    gearType: "torso",
    modType: "Defense",
    description:
      "When HP is lower than 60%, purge all Deviated State (cooldown: 15s)",
    stats: {},
  },
  {
    id: "rejuvenating",
    name: "Rejuvenating",
    gearType: "torso",
    modType: "Conditional",
    description: "When HP is above 60%, a kill recovers 15% lost HP.",
    stats: {},
  },
  {
    id: "ardent-shield",
    name: "Ardent Shield",
    gearType: "torso",
    modType: "Conditional",
    description:
      "While the shield is active, you gain 15% DMG Reduction. When the shield exceeds 1,000, single instances of DMG will not penetrate the shield.",
    stats: {},
  },

  // Gloves Mods
  {
    id: "crit-amplifier",
    name: "Crit Amplifier",
    gearType: "gloves",
    modType: "Crit DMG",
    description: "Crit Rate +10%, Crit DMG +15%.",
    stats: {},
  },
  {
    id: "crit-boost",
    name: "Crit Boost",
    gearType: "gloves",
    modType: "Crit Rate",
    description: "Crit Rate +15.0%",
    stats: {},
  },
  {
    id: "elemental-overload",
    name: "Elemental Overload",
    gearType: "gloves",
    modType: "Elemental DMG",
    description: "Element DMG (Blaze, Frost, Shock, Blast) +18%",
    stats: {},
  },
  {
    id: "status-enhancement",
    name: "Status Enhancement",
    gearType: "gloves",
    modType: "Status DMG",
    description: "Status DMG +20.0%",
    stats: {},
  },
  {
    id: "munitions-amplifier",
    name: "Munitions Amplifier",
    gearType: "gloves",
    modType: "Weapon DMG",
    description: "Weapon DMG +15.0%",
    stats: {},
  },
  {
    id: "lifeforce-boost",
    name: "Lifeforce Boost",
    gearType: "gloves",
    modType: "HP",
    description: "HP +12%",
    stats: {},
  },
  {
    id: "weakspot-dmg-boost",
    name: "Weakspot DMG Boost",
    gearType: "gloves",
    modType: "Weakspot DMG",
    description: "Weakspot DMG Boost +25%",
    stats: {},
  },
  {
    id: "melee-amplifier",
    name: "Melee Amplifier",
    gearType: "gloves",
    modType: "Melee DMG",
    description: "Melee DMG +20.0%",
    stats: {},
  },

  // Bottoms Mods
  {
    id: "deadshot",
    name: "Deadshot",
    gearType: "bottoms",
    modType: "Crit DMG",
    description:
      "Each Crit Hit by non-melee weapons grants +5% Crit DMG, up to 45%. The effect is removed upon the next reload.",
    stats: {},
  },
  {
    id: "melee-momentum",
    name: "Melee Momentum",
    gearType: "bottoms",
    modType: "Melee DMG",
    description:
      "Killing with melee attacks restores 30.0% of Max Stamina and grants +20.0% Melee DMG for 8 seconds",
    stats: {},
  },
  {
    id: "reload-rampage",
    name: "Reload Rampage",
    gearType: "bottoms",
    modType: "Weapon DMG Elemental DMG",
    description:
      "Killing 2 enemies refills 2 bullets from inventory (no more than half of the mag), and grants +10.0% Weapon and Status DMG, lasting until the next reload",
    stats: {},
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    gearType: "bottoms",
    modType: "Weakspot DMG",
    description:
      "Weakspot DMG +10% when a bullet hits a target more than 20m away. For every additional 1meters away from the target, Weakspot DMG +1% up to 20%.",
    stats: {},
  },
  {
    id: "bullet-siphon",
    name: "Bullet Siphon",
    gearType: "bottoms",
    modType: "Weapon DMG",
    description:
      "Weapon DMG +5%. Every 5 bullets consumed in the magazine grants +4% Weapon DMG, capped at 20%.",
    stats: {},
  },
  {
    id: "abnormal-increase",
    name: "Abnormal Increase",
    gearType: "bottoms",
    modType: "Status DMG",
    description:
      "When the magazine is empty, Status DMG + 10% for 12s (up to 3 stacks)",
    stats: {},
  },
  {
    id: "precision-charge",
    name: "Precision Charge",
    gearType: "bottoms",
    modType: "Elemental DMG",
    description:
      "For every 10% Weakspot hit rate of the previous magazine, Elemental DMG +4%, up to 24%, lasting for 10s. Reloading resets the calculation.",
    stats: {},
  },
  {
    id: "three-strikes",
    name: "Three Strikes",
    gearType: "bottoms",
    modType: "Weakspot DMG",
    description:
      "For the first three hits after reloading (not exceeding 50% of magazine capacity), Weakspot DMG +50%.",
    stats: {},
  },
  {
    id: "critical-surge",
    name: "Critical Surge",
    gearType: "bottoms",
    modType: "Crit DMG",
    description:
      "When the magazine is empty, Crit DMG +15% for 12s. Stacks independently, up to 3 stack(s).",
    stats: {},
  },
  {
    id: "elemental-resonance",
    name: "Elemental Resonance",
    gearType: "bottoms",
    modType: "Elemental DMG",
    description:
      "For each instance of Elemental DMG dealt from the previous magazine, the next magazine gains Elemental DMG +1% for 15s upon reloading, up to 24%.",
    stats: {},
  },

  // Shoes Mods
  {
    id: "covered-advance",
    name: "Covered Advance",
    gearType: "shoes",
    modType: "Conditional Weapon DMG Status DMG",
    description:
      "Taking no DMG within 4s grants +20% Melee, Weapon, and Status DMG for 30 seconds. The effect resets when the duration ends.",
    stats: {},
  },
  {
    id: "slow-and-steady",
    name: "Slow And Steady",
    gearType: "shoes",
    modType: "Conditional Weapon Status DMG",
    description:
      " +10% Melee, Weapon, Status DMG. When HP is above 90%, DMG +10%",
    stats: {},
  },
  {
    id: "secluded-strike",
    name: "Secluded Strike",
    gearType: "shoes",
    modType: "Conditional Weapon DMG Status DMG",
    description:
      "Having no enemies within 7 meters around you grants +15% Weapon and Status DMG.",
    stats: {},
  },
  {
    id: "rush-hour",
    name: "Rush Hour",
    gearType: "shoes",
    modType: "Conditional Weapon DMG Status DMG",
    description: "Every 10% HP loss grants +4% Melee, Weapon, and Status DMG.",
    stats: {},
  },
  {
    id: "ruthless-reaper",
    name: "Ruthless Reaper",
    gearType: "shoes",
    modType: "Conditional Refill Ammo Precision",
    description:
      "After accumulating 2 kill(s), refill the 100% of your magazine from your reserves.",
    stats: {},
  },
  {
    id: "ferocious-charge",
    name: "Ferocious Charge",
    gearType: "shoes",
    modType: "Conditional Weapon DMG Status DMG",
    description:
      "Killing enemies within 10 meters grants Melee, Weapon DMG, Status DMG +20% for 8s",
    stats: {},
  },
  {
    id: "power-of-striving",
    name: "Power of Striving",
    gearType: "shoes",
    modType: "Conditional Weapon DMG Status DMG",
    description:
      "Weapon and Status DMG +10%. Stamina loss grants an additional DMG boost, up to 20%.",
    stats: {},
  },
  {
    id: "against-all-odds",
    name: "Against All Odds",
    gearType: "shoes",
    modType: "Conditional Weapon DMG Status DMG",
    description:
      "Weapon and Status DMG +10%. For every 5% Max HP consumed, gains an additional +5%, lastings 5s, stacking up to 3 stacks.",
    stats: {},
  },
]

// Helper functions
export const getModsByGearType = (gearType: Mod["gearType"]): Mod[] => {
  return modsData.filter((mod) => mod.gearType === gearType)
}

export const getModById = (id: string): Mod | undefined => {
  return modsData.find((mod) => mod.id === id)
}

export const getModsByType = (modType: string): Mod[] => {
  return modsData.filter((mod) => mod.modType === modType)
}
