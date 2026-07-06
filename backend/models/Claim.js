// backend/models/Claim.js
const { supabase } = require('../config/supabase');

class Claim {
  static async create(claimData) {
    const { data, error } = await supabase
      .from('claims')
      .insert([claimData])
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('claims')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }
}

module.exports = Claim;
