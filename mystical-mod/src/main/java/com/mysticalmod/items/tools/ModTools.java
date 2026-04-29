package com.mysticalmod.items.tools;

import com.mysticalmod.MysticalMod;
import net.minecraft.world.item.AxeItem;
import net.minecraft.world.item.HoeItem;
import net.minecraft.world.item.PickaxeItem;
import net.minecraft.world.item.ShovelItem;
import net.minecraft.world.item.SwordItem;
import net.minecraft.world.item.Tier;
import net.minecraft.world.item.crafting.Ingredient;
import net.minecraftforge.registries.RegistryObject;

import java.util.function.Supplier;

public class ModTools {
    
    public static final Tier MYSTICAL_TIER = new Tier() {
        @Override
        public int getUses() {
            return 2000;
        }

        @Override
        public float getSpeed() {
            return 10.0F;
        }

        @Override
        public float getAttackDamageBonus() {
            return 4.0F;
        }

        @Override
        public int getLevel() {
            return 4;
        }

        @Override
        public int getEnchantmentValue() {
            return 22;
        }

        @Override
        public Ingredient getRepairIngredient() {
            return Ingredient.of(com.mysticalmod.items.ModItems.MYSTICAL_GEM.get());
        }
    };

    public static RegistryObject<net.minecraft.world.item.Item> registerSword() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_sword",
            () -> new SwordItem(MYSTICAL_TIER, 5, -2.4F, 
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerPickaxe() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_pickaxe",
            () -> new PickaxeItem(MYSTICAL_TIER, 2, -2.8F,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerAxe() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_axe",
            () -> new AxeItem(MYSTICAL_TIER, 7, -3.0F,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerShovel() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_shovel",
            () -> new ShovelItem(MYSTICAL_TIER, 2, -3.0F,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerHoe() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_hoe",
            () -> new HoeItem(MYSTICAL_TIER, 1, -1.0F,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerHelmet() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_helmet",
            () -> new net.minecraft.world.item.ArmorItem(
                com.mysticalmod.items.armor.ModArmorMaterials.MYSTICAL,
                net.minecraft.world.item.ArmorItem.Type.HELMET,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerChestplate() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_chestplate",
            () -> new net.minecraft.world.item.ArmorItem(
                com.mysticalmod.items.armor.ModArmorMaterials.MYSTICAL,
                net.minecraft.world.item.ArmorItem.Type.CHESTPLATE,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerLeggings() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_leggings",
            () -> new net.minecraft.world.item.ArmorItem(
                com.mysticalmod.items.armor.ModArmorMaterials.MYSTICAL,
                net.minecraft.world.item.ArmorItem.Type.LEGGINGS,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }

    public static RegistryObject<net.minecraft.world.item.Item> registerBoots() {
        return com.mysticalmod.items.ModItems.ITEMS.register("mystical_boots",
            () -> new net.minecraft.world.item.ArmorItem(
                com.mysticalmod.items.armor.ModArmorMaterials.MYSTICAL,
                net.minecraft.world.item.ArmorItem.Type.BOOTS,
                new net.minecraft.world.item.Item.Properties().stacksTo(1)));
    }
}
